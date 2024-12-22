/**
 * Local Module `log`를 정의하는 파일입니다.
 * 
 * [ Module 종류 ]
 * 1. Core Module: Node.js에서 기본적으로 제공하는 모듈(fs, http 등)
 * 2. Local Module: Node.js에서 사용자가 로컬 환경에서 직접 생성한 모듈
 * 3. Third Party Module: NPM(Node Package Manager)을 통해 사용할 수 있는 다른 사용자가 생성하여 온라인에 배포한 모듈(express, lodash 등)
 */
var log = {
  info: function (info) {
    console.log("INFO: " + info);
  },
  warning: function (warning) {
    console.log("WARNING: " + warning);
  },
  error: function (error) {
    console.log("ERROR: " + error);
  }
};

// log 객체를 외부로 내보내기
module.exports = log;
