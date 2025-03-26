const net = require("net");

const server = net.createServer();

// socket simply means, your endpoint
// this socket is a duplex stream
server.on("connection", (socket) => {
  console.log("A new connection to the server.");
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened Server on", server.address());
});
