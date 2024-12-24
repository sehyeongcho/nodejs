const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  // 요청 URL에 따라 분기 처리합니다.
  if (req.url === "/home") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      a: "a",
      b: "b",
    }));
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>About Page</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

// 서버를 지정된 포트에서 시작하고, 준비가 완료되면 콘솔에 메시지를 출력합니다.
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
