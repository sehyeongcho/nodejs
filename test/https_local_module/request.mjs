function encrypt(data) {
  return "암호화된 데이터";
};

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData}가 ${url} URL로 전송되고 있습니다.`);
};

export {
  send
};
