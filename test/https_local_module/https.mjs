import { send } from "./request.mjs"; // 요청을 처리하는 모듈
import { read } from "./response.mjs"; // 응답을 처리하는 모듈

/**
 * makeRequest: 주어진 URL로 데이터를 전송하고, 응답 데이터를 반환합니다.
 * 
 * @param {*} url - 요청을 보낼 대상 URL 
 * @param {*} data - 전송할 데이터
 * @returns {*} 응답 데이터
 */
function makeRequest(url, data) {
  // 요청 보내기 (request 모듈의 send 메서드 사용용)
  send(url, data);

  // 요청에 대한 응답 반환하기 (response 모듈의 read 메서드 사용용)
  return read();
};

// 모듈로 내보내기: makeRequest 함수를 외부에서 사용할 수 있도록 공개
export {
  makeRequest
};
