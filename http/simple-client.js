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
    "Content-length": Buffer.byteLength(
      JSON.stringify({ message: "Hey you still there?" }),
      "utf-8"
    ),
  },
});

// This event is emitted only once
request.on("response", (response) => {
  // reading the response happens here.
});

// request.write(JSON.stringify({ message: "Hi there!" }));
// request.write(JSON.stringify({ message: "How are you doing?" }));
request.write(JSON.stringify({ message: "Hey you still there?" }));

// request.end(
//   JSON.stringify({ message: "This is going to be my last message!" })
// );
