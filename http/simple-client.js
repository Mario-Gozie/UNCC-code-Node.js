const http = require("node:http");

// An agent here corresponds to our tcp connection. remember that http request is always sent on tcp connections.
const agent = new http.Agent({ keepAlive: true }); // so here we are basically saying keep TCP request that is created after http connection alive. so that maybe more requests can be sent through that same connection.

// CREATING A REQUEST OBJECT This is a duplex stream

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "content-type": "application/json",
    name: "Joe",
  },
});

// This event is emitted only once
request.on("response", (response) => {
  // reading the response happens here.

  console.log("----------------STATUS: ------------------------");
  console.log(response.statusCode);

  console.log("----------------HEADERS: ------------------------");
  console.log(response.headers);

  console.log("----------------BODY: ------------------------");
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));

    response.on("end", () => {
      console.log("No more data in response");
    });
  });
});

request.end(
  JSON.stringify({
    title: "Title of my post",
    body: "This is my text and more and more.",
  })
);
