import { send } from "./request.mjs"; // 요청을 처리하는 모듈
import { read } from "./response.mjs"; // 응답을 처리하는 모듈
import { decrypt } from "./response.mjs"; // 이미 위에서 response.mjs 모듈을 가져왔으므로, 캐시된 인스턴스를 재사용합니다.

/**
 * ESM의 모듈 캐싱 동작:
 * - 동일한 모듈 파일(`response.mjs`)은 한 번만 로드됩니다.
 * - 두 번째 `import`는 기존에 로드된 모듈의 캐시된 결과를 참조합니다.
 * - 따라서, 성능 상의 문제가 발생하지 않으며 중복 로드는 없습니다.
 */

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
