const net = require("net"); // including the net module
// This is the lowest level of the networking module. all other module are built on top of this. such as the http module, etc.

const server = net.createServer((socket) => {}); // where the server is created.

server.listen(3099, "127.0.0.1", () => {
  console.log("opened server on", server.address());
}); // The port to be listened to before firing the server. each application need to have its own port. This is because the requests comming to your computer need to know where to go.

// This server part also takes an IP address and then maybe a function that runs when the server is working.
