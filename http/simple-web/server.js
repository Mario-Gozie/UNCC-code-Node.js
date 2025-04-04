const http = require("node:http");
const fs = require("fs/promises");

const server = http.createServer();

server.on("request", (request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");

    response.write("");
  }
  console.log(request.method);
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
