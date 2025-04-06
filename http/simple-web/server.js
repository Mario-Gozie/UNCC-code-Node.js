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

  if (request.url === "/login" && request.method === "POST") {
    response.setHeader("Content-Type", "application/json");

    response.statusCode = 200;

    const body = {
      message: "Logging you in ...",
    };

    // If you are using encoding chunked, instead of using the file length, then you need to use end to tell node that the item is finished.
    response.end(JSON.stringify(body));
  }

  if (request.url === "/user" && request.method === "PUT") {
    response.setHeader("Content-Type", "application/json");

    response.statusCode = 401;

    const body = {
      message: "You first have to login.",
    };

    // If you are using encoding chunked, instead of using the file length, then you need to use end to tell node that the item is finished.
    response.end(JSON.stringify(body));
  }

  // upload route
  if (request.url == "/upload" && request.method === "POST") {
    const fileHandle = await fs.open("./storage/image.jpeg", "w");
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;

    const fileStream = fileHandle.createWriteStream();

    request.pipe(fileStream);

    request.on("end", () => {
      response.end(
        JSON.stringify({ message: "file was uploaded successfully!" })
      );
    });
  }
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
