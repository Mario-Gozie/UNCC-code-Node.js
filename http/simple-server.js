const http = require("node:http");

// creating the simple server

const server = http.createServer();

server.on("request", (request, response) => {
  console.log("----------------METHOD: ------------------------");
  console.log(request.method); // METHODS TELL US  WHAT THE REQUEST IS SUPPOSED TO DO. if it is a get request, it means that it wants to get some data. if it is a post request, it means it wants to post some data to our server. if it is a delete method, it means it wants to delete something from our server.

  console.log("----------------URL: ------------------------");
  console.log(request.url); // eg if url is "/users" it may have to do with all requests that deals with creating a new user.

  console.log("----------------HEADERS: ------------------------");
  console.log(request.headers); // headers indicate how the request is structured. eg. saying the body will be json, etc. eg. who sent request, machine the person used. etc. we could add any other extra infomation.

  // The body would not come as a buffer, or text because it will take huge part of our memory. it would come as a stream. This is why we can't access the body as request.body

  // REMEMBER: Request is a readable stream
  console.log("----------------BODY: ------------------------");

  let data = "";
  request.on("data", (chunk) => {
    data += chunk.toString("utf-8");
  });

  const name = request.headers.name;

  request.on("end", () => {
    data = JSON.parse(data);

    console.log(data);
    console.log(name);
  });
});

server.listen(8050, () => {
  console.log(`Server listening on http://localhost:8050`);
});
