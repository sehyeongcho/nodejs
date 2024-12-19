let count = 0;

const callback = () => {
  console.log(`setImmediate 비동기 함수의 콜백 함수입니다. (${count++})`);
  setImmediate(callback); // 재귀 호출이 다음 Check 페이즈로 넘어가기 때문에 Timers 페이즈가 차단되지 않습니다.
};

setImmediate(callback); // Check 페이즈에서 처리됩니다.

setTimeout(() => console.log('setTimeout 비동기 함수의 콜백 함수입니다.'), 50); // Timers 페이즈에서 처리됩니다.

console.log('동기 함수입니다.');
// 동기 함수이므로 위의 비동기 함수들이 실행되기 전에 가장 먼저 실행됩니다.
