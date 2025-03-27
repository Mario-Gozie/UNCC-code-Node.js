const net = require("net");

const server = net.createServer();

// An array of client objects/sockets
const clients = [];
// socket simply means, your endpoint
// this socket is a duplex stream
server.on("connection", async (socket) => {
  console.log("A new connection to the server.");

  const clientId = clients.length + 1;

  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push({ id: clientId.toString(), socket }); // passed in an object into the clients array. so we will be having an array of objects where there is an Id and also a socket.
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened Server on", server.address());
});
