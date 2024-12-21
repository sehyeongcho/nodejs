const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello, World!</h1>");
});
// 모듈을 사용하여 HTTP 서버를 만듭니다.

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
// 서버는 지정된 포트 3000에서 수신 대기하도록 설정됩니다.
// 서버가 준비되면 콜백 함수가 호출됩니다.
