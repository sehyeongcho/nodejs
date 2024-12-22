setTimeout(() => console.log('setTimeout'), 0);
// 콜백 함수는 Timers 페이즈에서 실행됩니다. 여기서 0ms는 최소 지연 시간 규칙에 따라 실제로 1ms 이상입니다.

setImmediate(() => console.log('setImmediate'));
// 콜백 함수는 Check 페이즈에서 실행됩니다.

// Poll 큐가 비어 있는 경우
// Poll 페이즈는 `setImmediate` 실행을 위해 Check 페이즈로 넘어갈 수 있습니다.
// 하지만 Timers 큐의 타이머가 설정된 시간이 초과되었으면 Poll 페이즈에서 Timers 페이즈로 돌아갑니다.

// 실행 흐름
// 1. setTimeout의 콜백 함수가 Timers 큐에 등록됩니다.
// 2. setImmediate의 콜백 함수가 Check 큐에 등록됩니다.
// 3-1. 1ms 전에 Poll 페이즈에 도달한 경우: Check 페이즈로 넘어가서 `setImmediate`의 콜백 함수를 먼저 실행하므로 `setImmediate`가 먼저 출력됩니다.
// 3-2. 1ms 후에 Poll 페이즈에 도달한 경우: Timers 페이즈로 돌아가서 `setTimeout`의 콜백 함수를 먼저 실행하므로 `setTimeout`이 먼저 출력됩니다.
