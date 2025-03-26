const net = require("net"); // including the net module
// This is the lowest level of the networking module. all other module are built on top of this. such as the http module, etc.

const server = net.createServer((socket) => {
  // The socket is actually connections. if any body connects to my server, it will come in as a socket. and socket is a stream and it is a duplex stream. so it can read and write

  socket.on("data", (data) => {
    // here, the socket listens for data, accepts the data, convert it to string and render it to the console.
    console.log(data);
  });
}); // where the server is created.

server.listen(3099, "127.0.0.1", () => {
  console.log("opened server on", server.address());
}); // The port to be listened to before firing the server. each application need to have its own port. This is because the requests comming to your computer need to know where to go.

// This server part also takes an IP address and then maybe a function that runs when the server is working.

// TCP requests are used to send infomation you want to be exactly the wy they are like password. without changing it.

// UDP is generally faster than TCP. they are used to streaming activities like video etc. it doesnt care about sending exact data some data may be missing. it can also be used for voice talking facetiming. http request is built on top of UDP and SSH requests are built on top of TCP

// This IP address "127.0.0.1" is known as a loop back address. when an information is sent to it. it still goes back to the computer. it can also be called a local host.
