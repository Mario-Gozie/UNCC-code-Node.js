const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");

    const fileHandle = await fs.open("./public/index.html", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response); // pipe reads from the readable stream and writes to the response and it automatically handles draining
  }

  if (request.url === "/styles.css" && request.method === "GET") {
    response.setHeader("Content-Type", "text/css");

    const fileHandle = await fs.open("./public/styles.css", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response); // pipe reads from the readable stream and writes to the response and it automatically handles draining
  }

  if (request.url === "/scripts.js" && request.method === "GET") {
    response.setHeader("Content-Type", "text/javascript");

    const fileHandle = await fs.open("./public/scripts.js", "r");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response); // pipe reads from the readable stream and writes to the response and it automatically handles draining
  }
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
