const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  // 상태 코드와 응답 헤더를 설정합니다.
  // res.writeHead()는 res.end() 전에 호출되어야 합니다.
  res.writeHead(200, {
    "Content-Type": "text/plain", // 응답의 콘텐츠 유형을 설정합니다.
  });
  // 응답 본문을 클라이언트에 전송하고, 연결을 종료합니다.
  res.end("Hello, World!");
});

// 서버를 지정된 포트에서 시작하고, 준비가 완료되면 콘솔에 메시지를 출력합니다.
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
