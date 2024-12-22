let count = 0;

const callback = () => {
  console.log(`nextTick 비동기 함수의 콜백 함수입니다. (${count++})`);
  process.nextTick(callback); 
  // nextTick의 콜백 함수에서 다시 nextTick을 재귀적으로 호출하므로, 이벤트 루프가 시작 페이즈를 벗어나지 못하고 계속 차단됩니다.
};

setImmediate(() => console.log('setImmediate 비동기 함수의 콜백 함수입니다.'));
// Check 페이즈에서 처리됩니다. 하지만 nextTick의 재귀 호출로 인해 실행되지 못합니다.

setTimeout(() => console.log('setTimeout 비동기 함수의 콜백 함수입니다.'), 100);
// Timers 페이즈에서 처리됩니다. 하지만 nextTick의 재귀 호출로 인해 실행되지 못합니다.

process.nextTick(callback);
// nextTick은 이벤트 루프의 시작 시, 그리고 각 페이즈 사이에서 처리되므로 다른 비동기 함수들보다 먼저 실행됩니다.

console.log('동기 함수입니다.');
// 동기 함수이므로 위의 비동기 함수들이 실행되기 전에 가장 먼저 실행됩니다.
