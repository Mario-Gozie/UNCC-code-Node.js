const net = require("net");

const server = net.createServer();

// An array of client objects/sockets
const clients = [];
// socket simply means, your endpoint
// this socket is a duplex stream
server.on("connection", async (socket) => {
  console.log("A new connection to the server.");

  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push(socket);
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened Server on", server.address());
});
