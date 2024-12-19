# nodejs

## 학습 내용
- JavaScript를 실행하기 위해서는 JavaScript 엔진이 필요합니다.
- Chrome 브라우저는 V8 JavaScript 엔진을 사용하므로 JavaScript를 실행할 수 있습니다.
- 브라우저 외부 환경에서도 JavaScript를 실행하고 싶다면 V8 JavaScript 엔진을 기반으로 한 다른 런타임인 Node.js를 사용할 수 있습니다. Node.js는 V8 엔진 위에 파일 시스템, 네트워킹, HTTP 서버와 같은 다양한 서버 측 기능을 제공합니다.
- Node.js를 설치한 후 CLI에서 `node` 명령어를 통해 Node.js REPL(Read-Eval-Print Loop) 환경에 접속하면 JavaScript를 실행할 수 있습니다. REPL은 사용자가 입력한 코드를 읽고(Read), 실행하며(Eval), 결과를 출력(Print)하고, 다시 대기 상태(Loop)에 들어가는 대화형 환경을 제공합니다.
- 브라우저와 Node.js는 JavaScript 런타임으로 JavaScript 엔진을 사용하는 공통점이 있지만 차이점도 있습니다. 브라우저에서는 전역 객체로 `window`를 사용하지만, Node.js에서는 `global`이라는 객체가 사용됩니다. 또한, `window` 객체는 브라우저에서만 사용할 수 있고, `global` 객체는 Node.js에서만 사용할 수 있습니다.

- Node.js JavaScript 런타임의 구성 요소
  - V8 JavaScript 엔진: JavaScript 코드를 실행하는 엔진입니다.
  - libuv: 비동기 I/O 작업을 처리하는 라이브러리입니다. 이벤트 루프와 스레드 풀을 제공해 파일 시스템 접근, 네트워크 요청, 타이머 등을 처리합니다.
- 작업 흐름
  - JavaScript 코드가 V8 JavaScript 엔진에서 실행됩니다.
  - 데이터베이스 접근, 파일 읽기 등 V8 JavaScript 엔진이 직접 처리할 수 없는 작업이 발생하면, Node.js API를 통해 이를 처리합니다.
  - Node.js API 함수가 호출되면 Node.js 바인딩을 통해 libuv에 작업이 전달됩니다.
  - libuv는 작업을 처리하고, 결과를 콜백(callback) 형태로 JavaScript 코드에 전달합니다.
- Node.js 바인딩
  - Node.js 바인딩은 JavaScript 코드와 C, C++ 코드 사이를 연결하는 역할을 합니다.
  - Node.js의 많은 내장 모듈이 C, C++로 구현되어 있으며, 이를 JavaScript 코드에서 호출할 수 있도록 돕습니다.

- 작업 흐름(파일 열기 작업 예시)
  - JavaScript 코드가 V8 JavaScript 엔진에서 실행됩니다.
  - 데이터베이스 접근, 파일 읽기 등 V8 JavaScript 엔진이 직접 처리할 수 없는 작업이 발생하면, Node.js API를 통해 이를 처리합니다.
    - `fs.open()` 함수 호출 시 내부적으로 lib/fs.js에 정의된 함수가 실행됩니다.
  - Node.js API 함수가 호출되면 Node.js 바인딩을 통해 libuv에 작업이 전달됩니다.
    - `lib/fs.js`의 `binding.open()` 호출
    - `src/node_file.cc`의 `Open()` 호출
    - `libuv`의 `uv_fs_open()` 함수에 작업 전달
  - libuv는 작업을 처리하고, 결과를 콜백(callback) 형태로 JavaScript 코드에 전달합니다.
    - `libuv`의 `uv_fs_open()` 호출
    - 내부적으로 `uv__fs_open()` 호출
    - 운영체제의 시스템 레벨 함수인 `open()` 함수를 호출
    - `open()` 시스템 콜을 통해 실제 파일이 열리게 되며, 작업 결과를 반환합니다.
  - 작업이 완료되면 libuv가 등록된 콜백 함수를 호출해 결과를 JavaScript 코드에 전달합니다.
  - 이후 JavaScript 코드에서 결과를 처리합니다.

- `async/await`, `then`을 사용하는 이유는 비동기 작업을 동기적으로 실행하는 것처럼 보이게 만들어 가독성과 코드 유지보수성을 높이기 위해서입니다.
- JavaScript는 본질적으로 동기 언어입니다. 하지만 우리가 사용하는 비동기 코드는 JavaScript 자체의 기능이 아니라 브라우저나 Node.js 런타임에서 제공하는 API를 통해 동작합니다.
  - 예를 들어, `setTimeout()` 함수는 비동기적으로 동작하지만, 이는 JavaScript 자체가 아니라 브라우저의 `window` 객체 또는 Node.js의 `global` 객체를 통해 제공되는 API입니다.

- Blocking이란, JavaScript 코드 실행이 특정 non-JavaScript 작업(파일 읽기, 네트워크 요청 등)이 완료될 때까지 중단되는 현상을 의미합니다.
- Node.js의 표준 라이브러리는 대부분의 I/O 메서드에 대해 non-blocking 버전을 제공합니다.
- Non-blocking 메서드가 완료된 후 실행 흐름을 제어하고 싶다면, 다음과 같은 방식으로 비동기 작업을 처리할 수 있습니다.
  - 콜백 함수
  - Promise
  - async/await

- 프로세스(Process)
  - 프로세스는 실행 중인 프로그램으로, 운영체제에 의해 관리됩니다.
  - 각 프로세스는 독립된 메모리 공간(주소 공간)을 가지고 있으며, 다른 프로세스와 메모리를 공유하지 않습니다.
  - 운영체제는 각 프로세스가 CPU를 사용할 수 있도록 스케줄링합니다.
- 스레드(Thread)
  - 스레드는 프로세스 내에서 실행 흐름을 담당하는 최소 실행 단위입니다.
  - 하나의 프로세스는 여러 스레드를 가질 수 있습니다(멀티 스레드).
  - 각 스레드는 동일한 프로세스의 코드(Code), 데이터(Data), 힙(Heap) 메모리 공간을 공유합니다.
  - 그러나 각 스레드는 독립적인 스택(Stack)을 가지고 있습니다. 스택은 함수 호출, 지역 변수 등을 저장합니다.
- 멀티 스레드의 주의점
  - 스레드 간에 공유 자원(Heap, Data 등)을 접근할 때 동기화를 고려해야 합니다.
  - 동기화 문제가 발생하면 예상치 못한 결과가 나올 수 있습니다.
  - 이를 해결하기 위해 뮤텍스(Mutex), 세마포어(Semaphore), 락(Lock) 등의 동기화 기법을 사용합니다.
- 프로세서(Processor)
  - 프로세서는 CPU를 지칭하며, 실제로 프로세스와 스레드를 실행하는 하드웨어입니다.
  - CPU가 멀티코어인 경우, 여러 프로세스를 동시에 실행할 수 있습니다(병렬 처리).
  - 단일 코어에서도 컨텍스트 스위칭(Context Switching)을 통해 프로세스를 동시적으로 실행하는 것처럼 보이게 처리할 수 있습니다.

- Node.js JavaScript 런타임은 싱글 스레드 기반의 JavaScript를 사용합니다.
- Node.js가 싱글 스레드임에도 비동기 작업을 처리할 수 있는 이유는 libuv라는 비동기 I/O 라이브러리를 활용하기 때문입니다.
- V8 JavaScript 엔진을 통해 JavaScript 코드를 처리하다가 비동기 요청을 발견하면 libuv로 전달합니다.
- libuv 내 이벤트 루프(Event Loop)는 비동기 요청을 분석하여, 파일 시스템 작업은 스레드 풀(Thread Pool)로, 네트워크 작업은 운영체제 커널로 전달합니다.
- 비동기 요청 작업이 완료되면, 이벤트 루프는 콜백 함수를 호출합니다.

- 이벤트 루프(Event Loop)는 Node.js에서 발생하는 비동기 요청을 관리하는 주체입니다. 이벤트 루프는 비동기 요청이 들어오면, 해당 요청의 콜백 함수를 Task Queue(또는 Event Queue)에 저장합니다. 이벤트 루프는 싱글 스레드이기 때문에 비동기 요청 자체는 이벤트 루프에서 직접 처리하지 않고, Thread Pool 또는 운영체제 커널에 위임하여 처리합니다. 비동기 작업이 완료되면, 이벤트 루프는 Task Queue에 저장된 콜백 함수를 호출하여 이를 실행합니다.
- 이벤트 루프는 아래와 같은 여러 페이즈로 구성되어 있으며, 각 페이즈는 비동기 요청의 콜백 함수들을 처리합니다.
  - Timers: `setTimeout`과 `setInterval`의 콜백을 처리합니다.
  - Pending Callbacks: 시스템 콜백이 대기 중인 상태에서 처리됩니다.
  - Idle, Prepare: 내부적으로 시스템 상태를 준비하고 대기하는 단계입니다.
  - Poll: 비동기 I/O 작업이 완료되었을 때 그 결과를 처리하는 단계입니다.
  - Check: `setImmediate`로 등록된 콜백을 처리하는 단계입니다.
  - Close Callbacks: 종료 작업과 관련된 콜백들을 처리합니다.
- 이벤트 루프는 싱글 스레드로 동작하기 때문에 각 페이즈가 완료되어야 다음 페이즈로 넘어갈 수 있습니다. 각 페이즈의 큐에 저장된 콜백 함수들이 처리되거나, 설정된 실행 한도에 도달하면 그 페이즈가 종료되고 다음 페이즈로 넘어갑니다.
  - 예를 들어, Poll 페이즈에서 콜백 함수 A가 실행 중이고, A 안에 콜백 함수 B가, B 안에 콜백 함수 C가 있을 때, Poll 페이즈 큐에 A, B, C가 차례대로 저장됩니다. 이 모든 콜백들이 처리되어야 Poll 페이즈가 완료됩니다. 만약 실행 한도에 도달했다면, 남은 콜백은 다음 루프에서 처리됩니다.
- 따라서, `setTimeout(A callback function, 1000)` 비동기 요청을 했을 때 Poll 페이즈에서 1030ms가 소요되는 작업을 처리하고 있다면, 이벤트 루프는 싱글 스레드이기 때문에 1030ms 후에 Timers 페이즈로 가게 되어 1000ms가 아닌 1030ms 후에 A 콜백 함수가 호출됩니다.
- 따라서, `setTimeout(A callback function, 1000)`과 같은 비동기 요청을 했을 때, Poll 페이즈에서 1030ms가 걸리는 작업을 처리 중이라면, 이벤트 루프는 그 작업이 끝난 후 Timers 페이즈로 넘어갑니다. `setTimeout` 콜백은 1030ms가 지나야 실행되므로, 예상보다 늦게 호출됩니다(즉, 1000ms가 아닌 1030ms 후에 호출됩니다).
