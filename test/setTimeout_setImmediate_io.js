const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('setTimeout'), 0);
  // 콜백 함수는 Timers 페이즈에서 실행됩니다. 여기서 0ms는 최소 지연 시간 규칙에 따라 실제로 1ms 이상입니다.

  setImmediate(() => console.log('setImmediate'));
  // 콜백 함수는 Check 페이즈에서 실행됩니다.
})

// 실행 흐름
// 1. `fs.readFile`의 콜백 함수가 I/O 작업을 기다리는 Poll 큐에 등록됩니다.
// 2. Poll 페이즈에 진입하여 콜백 함수를 실행합니다.
// 3. `setTimeout`의 콜백 함수가 Timers 큐에 등록됩니다.
// 4. `setImmediate`의 콜백 함수가 Check 큐에 등록됩니다.
// 5. Poll 큐의 콜백 함수 실행을 마쳤으므로 현재는 Poll 페이즈에 있습니다.
// 6. Poll 큐가 비었고, Check 큐에 `setImmediate`의 콜백 함수가 등록되어 있으므로, 이벤트 루프는 Check 페이즈로 넘어가서 `setImmediate` 콜백을 먼저 실행하므로 `setImmediate`가 먼저 출력됩니다.
