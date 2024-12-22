const http = require("http"); // Node.js의 http 모듈을 불러옵니다.

const port = 3000; // 서버가 요청을 수신 대기할 포트를 설정합니다.

const server = http.createServer((req, res) => {
  // createServer는 HTTP 요청(req)을 처리하고 HTTP 응답(res)을 반환하는 서버를 생성합니다.
  res.statusCode = 200; // HTTP 상태 코드를 설정합니다. (200: OK)
  res.setHeader("Content-Type", "text/html"); // 응답의 Content-Type을 HTML로 설정합니다.
  res.end("<h1>Hello, World!</h1>"); // 클라이언트로 전송할 응답 본문을 설정하고 전송을 종료합니다.
});

server.listen(port, () => {
  // 지정된 포트에서 서버가 요청을 수신 대기하도록 설정합니다.
  console.log(`Server running at port ${port}`); // 서버가 준비되면 호출될 콜백 함수입니다.
});
