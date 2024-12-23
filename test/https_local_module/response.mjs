function decrypt(data) {
  return "복호화된 데이터";
};

function read() {
  return decrypt("데이터");
};

console.log("response.mjs 모듈에 접근했습니다.");

export {
  read,
  decrypt
};
