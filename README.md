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
