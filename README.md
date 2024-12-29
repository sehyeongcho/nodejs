# nodejs

## 학습 내용
- JavaScript를 실행하기 위해서는 JavaScript 엔진이 필요합니다.
- Chrome 브라우저는 V8 JavaScript 엔진을 사용하므로 JavaScript를 실행할 수 있습니다.
- 브라우저 외부 환경에서도 JavaScript를 실행하고 싶다면 V8 JavaScript 엔진을 기반으로 한 다른 런타임인 Node.js를 사용할 수 있습니다. Node.js는 V8 엔진 위에 파일 시스템, 네트워킹, HTTP 서버와 같은 다양한 서버 측 기능을 제공합니다.
- Node.js를 설치한 후 CLI에서 `node` 명령어를 통해 Node.js REPL(Read-Eval-Print Loop) 환경에 접속하면 JavaScript를 실행할 수 있습니다. REPL은 사용자가 입력한 코드를 읽고(Read), 실행하며(Eval), 결과를 출력(Print)하고, 다시 대기 상태(Loop)에 들어가는 대화형 환경을 제공합니다.
- 브라우저와 Node.js는 JavaScript 런타임으로 JavaScript 엔진을 사용하는 공통점이 있지만 차이점도 있습니다. 브라우저에서는 전역 객체로 `window`를 사용하지만, Node.js에서는 `global`이라는 객체가 사용됩니다. 또한, `window` 객체는 브라우저에서만 사용할 수 있고, `global` 객체는 Node.js에서만 사용할 수 있습니다.
<br/>

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
<br/>

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
<br/>

- `async/await`, `then`을 사용하는 이유는 비동기 작업을 동기적으로 실행하는 것처럼 보이게 만들어 가독성과 코드 유지보수성을 높이기 위해서입니다.
- JavaScript는 본질적으로 동기 언어입니다. 하지만 우리가 사용하는 비동기 코드는 JavaScript 자체의 기능이 아니라 브라우저나 Node.js 런타임에서 제공하는 API를 통해 동작합니다.
  - 예를 들어, `setTimeout()` 함수는 비동기적으로 동작하지만, 이는 JavaScript 자체가 아니라 브라우저의 `window` 객체 또는 Node.js의 `global` 객체를 통해 제공되는 API입니다.
<br/>

- Blocking이란, JavaScript 코드 실행이 특정 non-JavaScript 작업(파일 읽기, 네트워크 요청 등)이 완료될 때까지 중단되는 현상을 의미합니다.
- Node.js의 표준 라이브러리는 대부분의 I/O 메서드에 대해 non-blocking 버전을 제공합니다.
- Non-blocking 메서드가 완료된 후 실행 흐름을 제어하고 싶다면, 다음과 같은 방식으로 비동기 작업을 처리할 수 있습니다.
  - 콜백 함수
  - Promise
  - async/await
<br/>

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
<br/>

- Node.js JavaScript 런타임은 싱글 스레드 기반의 JavaScript를 사용합니다.
- Node.js가 싱글 스레드임에도 비동기 작업을 처리할 수 있는 이유는 libuv라는 비동기 I/O 라이브러리를 활용하기 때문입니다.
- V8 JavaScript 엔진을 통해 JavaScript 코드를 처리하다가 비동기 요청을 발견하면 libuv로 전달합니다.
- libuv 내 이벤트 루프(Event Loop)는 비동기 요청을 분석하여, 파일 시스템 작업은 스레드 풀(Thread Pool)로, 네트워크 작업은 운영체제 커널로 전달합니다.
- 비동기 요청 작업이 완료되면, 이벤트 루프는 콜백 함수를 호출합니다.
<br/>

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
- 따라서, `setTimeout(A callback function, 1000)`과 같은 비동기 요청을 했을 때, Poll 페이즈에서 1030ms가 걸리는 작업을 처리 중이라면, 이벤트 루프는 그 작업이 끝난 후 Timers 페이즈로 넘어갑니다. `setTimeout` 콜백은 1030ms가 지나야 실행되므로, 예상보다 늦게 호출됩니다(즉, 1000ms가 아닌 1030ms 후에 호출됩니다).
<br/>

- 브라우저에서 DOM 이벤트를 사용하여 이벤트 기반 시스템을 구현할 수 있는 것처럼, Node.js에서도 `events` 모듈을 통해 이벤트 기반 시스템을 구현할 수 있습니다.
<br/>

- Node.js에서 모듈(Module)은 필요한 함수, 객체, 또는 값을 포함하는 독립적인 코드 단위입니다. 이를 통해 코드의 재사용성과 관리 효율성을 높일 수 있습니다.
  - 기존 코드의 재사용: 한 번 작성된 코드를 여러 프로젝트나 파일에서 재사용할 수 있습니다. (유틸리티 함수, 데이터베이스 연결 코드 등)
  - 관련 코드의 정리: 서로 관련 있는 기능을 하나의 모듈로 묶어 구조화할 수 있습니다. (userController.js, authMiddleware.js 등)
  - 세부 구현의 은닉화: 사용 목적과 직접 관련이 없는 구현 세부사항을 숨길 수 있습니다. (내부적으로 사용되는 헬퍼 함수나 변수는 외부에 노출하지 않고 모듈 내부에서만 사용할 수 있습니다.)
- CommonJS 모듈은 `require`, `module.exports`를 사용하고, ECMAScript 모듈(ESM)은 `import`, `export`를 사용하여 모듈을 가져오거나 내보낼 수 있습니다.
- Node.js에서는 모듈이 한 번 로드되면 캐싱됩니다. 동일한 모듈을 다시 가져오더라도 캐싱된 결과를 재사용합니다.
- `index.js` 파일을 생성하여 여러 모듈을 중앙에서 가져오고 내보내는 방식은 모든 모듈을 한 번에 로드하게 됩니다. 이로 인해 특정 모듈이 필요하지 않은 경우에도 불필요하게 로드되어 초기 로딩 시간이 증가할 수 있습니다.
<br/>

- NPM(Node Package Manager)은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자입니다. 명령 줄 클라이언트(npm), 패키지의 온라인 데이터베이스(npm 레지스트리)로 구성되어 있습니다.
  - package.json 파일 생성: `npm init -y`
  - package 설치: `npm install`
  - package 전역 설치: `npm install -g`
  - package 버전 취약성 파악: `npm audit`
  - package 버전 취약성 해결: `npm audit fix --force`
- node_modules 디렉터리에는 package.json의 모듈들과 이 모듈들이 의존하고 있는 모듈들까지 모두 포함되어 있습니다.
- SemVer(Semantic Versioning)은 major, minor, patch 총 3개 자리로 구성되어 있으며, 각 자리는 아래와 같은 상황에서 증가합니다.
  - Major: 호환되지 않는 API 변경
  - Minor: 기능 추가
  - Patch: 버그 수정
- SemVer에서 버전을 표기할 때 틸드(~), 캐럿(^) 기호를 사용할 수 있습니다.
  - 틸드(~): major, minor 자리는 변경되지 않고, patch 자리만 변경됩니다.
  - 캐럿(^): major 자리만 변경되지 않고, minor, patch 자리는 변경됩니다.
  - 단, 버전이 1.0.0 미만일 경우에는 틸드(~), 캐럿(^) 중 어느 기호를 사용하든지 틸드(~) 기호를 사용한 것처럼 동작합니다. (major, minor 자리는 변경되지 않고, patch 자리만 변경됩니다.) 이는 1.0.0 미만의 버전에서는 API 변경이 계속 일어나기 때문에 minor 자리의 변경으로도 호환이 되지 않을 수 있기 때문입니다.
- package-lock.json 파일은 package.json 파일이 실제 생성되는 시점의 의존성 트리에 대한 정보를 가지고 있습니다. package.json 파일만 있고 틸드(~), 캐럿(^) 기호로 버전이 표기되어 있으면, 패키지 업데이트 시 여러 사용자가 서로 다른 버전의 패키지를 사용하게 되어 호환에 문제가 발생할 수 있기 때문입니다. package-lock.json 파일은 package.json 파일이 실제 생성되는 시점의 정확한 패키지 버전 정보를 가지고 있습니다.
- nodemon은 파일 변경 감지 시 자동으로 프로그램을 다시 시작해주는 패키지입니다.
  - 전역 설치 시, nodemon의 경로를 입력해야 명령어를 사용할 수 있습니다.
  - 로컬 설치 시, nodemon 명령어만으로 사용할 수 있습니다.
<br/>

- NPM(Node Package Manager)은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자입니다. 패키지 설치 및 관리를 위한 명령 줄 클라이언트(npm CLI)와 패키지의 온라인 데이터베이스(npm 레지스트리)로 구성됩니다. NPM을 통해 프로젝트 의존성을 관리하고, 새로운 패키지를 생성하거나 배포할 수 있습니다.
  - package.json 파일 생성: `npm init -y`
  - 패키지 설치: `npm install`
  - 패키지 전역 설치: `npm install -g`
  - 패키지 버전 취약성 파악: `npm audit`
  - 패키지 버전 취약성 해결: `npm audit fix --force`
- node_modules 디렉터리에는 package.json에 명시된 모듈들과 이 모듈들이 의존하는 모든 하위 모듈들이 포함되어 있습니다.
- SemVer(Semantic Versioning)는 소프트웨어 버전 표기법으로, 세 가지 자리로 구성됩니다: Major, Minor, Patch.
  - Major: 호환되지 않는 API 변경
  - Minor: 새로운 기능 추가(기존 기능과 호환)
  - Patch: 버그 수정(기존 기능과 호환)
  - 예: 버전 2.4.3에서 Major는 2, Minor는 4, Patch는 3입니다.
- SemVer에서는 버전을 표기할 때 다음과 같은 범위 지정 기호를 사용할 수 있습니다.
  - 틸드(~): Major와 Minor 자리는 고정, Patch 자리만 변경 가능
    - 예: `~1.2.3` → 허용 가능한 버전은 `1.2.3`부터 `1.2.x`까지(x는 최신 버전)
  - 캐럿(^): Major 자리는 고정, Minor와 Patch 자리는 변경 가능
    - 예: `^1.2.3` → 허용 가능한 버전은 `1.2.3`부터 `1.x.x`까지(x는 최신 버전)
  - 단, 버전이 `0.x.x` 또는 `0.0.x`인 경우에는 Minor 자리까지 고정됩니다.
    - 예: `^0.1.2` → 허용 가능한 버전은 `0.1.x`까지
- package-lock.json 파일은 package.json의 의존성 트리에 대한 정확한 정보를 기록합니다. 이는 모든 개발자가 동일한 의존성 버전을 설치하도록 보장하며, 패키지 버전 충돌을 방지합니다.
- nodemon은 파일 변경 사항을 감지해 프로그램을 자동으로 다시 시작해주는 개발 도구입니다.
  - 전역 설치 시: `nodemon index.js` (명령어를 전역에서 사용할 수 있습니다.)
  - 로컬 설치 시: `./node_modules/.bin/nodemon index.js`, `npx nodemon index.js` (`package.json` 파일의 `scripts` 섹션에 `nodemon` 명령어를 추가해 실행할 수도 있습니다.)
- NPX(Node Package eXecute)는 NPM과 같이 설치되며, 다음과 같은 역할을 합니다.
  - 로컬 설치된 패키지 실행: 로컬 프로젝트에 설치된 실행 파일을 전역 경로를 지정하지 않고 실행할 수 있습니다.
    - 예: `npx nodemon index.js` (이는 `./node_modules/.bin/nodemon index.js`를 간단히 줄여주는 역할을 합니다.)
  - 일회성 패키지 실행: 패키지를 프로젝트에 설치하지 않고도 바로 실행할 수 있습니다.
    - 예: `npx create-react-app my-app` (이 명령은 `create-react-app`을 설치하지 않고 바로 실행합니다.)
  - 특정 버전의 패키지 실행: 특정 버전의 패키지를 설치하고 실행할 수 있습니다.
    - 예: `npx typescript@4.0 tsc --init`
  - 명령 충돌 방지: 로컬과 전역에 동일한 패키지가 설치된 경우, npx는 로컬 패키지를 우선 실행합니다.
<br/>

- 웹 서버(Web Server)는 HTTP 또는 HTTPS 프로토콜을 사용하여 클라이언트(웹 브라우저)로부터 요청받은 HTML 문서, 이미지 파일, 또는 기타 웹 리소스(오브젝트)를 전송하는 서비스 프로그램입니다.
- HTTP 메서드(HTTP Method)는 서버와 클라이언트 간의 요청(Request)에서 수행할 작업의 종류를 나타냅니다. 서버가 요청을 처리하는 방식에 대한 지침을 제공하며, 주요 메서드는 아래와 같습니다:
  - GET: 서버에서 데이터를 요청합니다. 주로 데이터를 조회할 때 사용됩니다.
    - 요청 URL에 데이터를 포함하기 때문에 길이 제한이 있습니다.
    - 브라우저 기록에 기본적으로 남습니다.
    - 캐시 가능하며, 동일 요청에 대해 서버 부하를 줄이는 데 유용합니다.
    - 민감한 데이터(비밀번호, 신용카드 정보 등)는 URL에 포함되므로 처리하기에 부적합합니다.
  - POST: 서버에 새로운 데이터를 생성하도록 요청합니다.
    - 요청 본문(Body)에 데이터를 포함하므로 길이 제한이 없습니다.
    - 브라우저 기록에 기본적으로 남지 않으며, 캐시되지 않습니다.
    - 민감한 데이터(비밀번호, 신용카드 정보 등)를 처리하기 적합합니다.
  - PUT: 서버에 데이터를 완전히 업데이트하도록 요청합니다.
    - username, email 필드 중 email만 업데이트하려면 username도 포함해야 합니다.
  - PATCH: 서버에 데이터를 부분적으로 업데이트하도록 요청합니다.
    - username, email 필드 중 email만 업데이트하려면 email만 포함하면 됩니다.
  - DELETE: 서버에서 데이터를 삭제하도록 요청합니다.
- HTTP는 무상태 프로토콜(Stateless Protocol)입니다. 이는 각 요청을 독립적인 트랜잭션으로 취급하며, 이전 요청의 상태나 정보를 유지하지 않는 통신 프로토콜을 의미합니다.
  - 이러한 설계는 요청 간의 연결 상태를 관리하지 않기 때문에, 서버 리소스 사용을 최소화하고 연결을 재설정하는 데 필요한 시간과 대역폭을 줄여 성능을 개선할 수 있습니다.
  - 그러나, 이로 인해 서버는 요청을 보낸 사용자의 정보를 자동으로 기억하지 못합니다.
- HTTP 프로토콜에서 사용자 정보를 기억하게 하려면 별도의 메커니즘을 사용해야 합니다. 가장 일반적인 방법 중 하나는 토큰(Token)을 활용하는 방식입니다.
  1. 토큰 생성: 서버는 사용자의 정보를 기반으로 한 토큰(JWT, 세션 토큰 등)을 생성합니다.
  2. 클라이언트에 토큰 전달: 서버는 생성된 토큰을 클라이언트에 전달합니다. 클라이언트는 이 토큰을 쿠키, 로컬 스토리지, 또는 세션 스토리지에 저장할 수 있습니다.
  3. 토큰 전송: 클라이언트는 이후 요청 시 이 토큰을 함께 전송합니다.
  4. 사용자 식별: 서버는 수신한 토큰을 검증하여 해당 요청이 어떤 사용자와 연관되어 있는지 식별할 수 있습니다.
- HTTP 상태 코드(HTTP Status Code)는 클라이언트의 요청에 대한 서버의 응답 상태를 나타내는 코드입니다. 주요 코드는 아래와 같습니다:
  - 200 OK: 요청이 성공적으로 처리되었습니다.
  - 201 Created: 요청이 성공적으로 처리되었으며, 새로운 리소스가 생성되었습니다.
  - 204 No Content: 요청이 성공적으로 처리되었지만 반환할 콘텐츠가 없습니다.
  - 301 Moved Permanently: 요청한 리소스의 URI가 영구적으로 변경되었습니다.
  - 400 Bad Request: 잘못된 요청으로 서버가 요청을 이해할 수 없습니다.
  - 401 Unauthorized: 인증이 필요하며, 제공된 인증 정보가 유효하지 않습니다.
  - 403 Forbidden: 요청은 이해했지만, 서버가 이를 허용하지 않습니다.
  - 404 Not Found: 요청한 리소스를 찾을 수 없습니다.
  - 409 Conflict: 요청이 현재 상태와 충돌하여 처리할 수 없습니다.
  - 500 Internal Server Error: 서버에서 요청을 처리하는 중에 예기치 못한 오류가 발생했습니다.
  - 503 Service Unavailable: 서버가 현재 요청을 처리할 준비가 되어 있지 않습니다(과부하, 유지 보수 등).
<br/>
