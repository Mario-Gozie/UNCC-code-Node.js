const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 3099 }, () => {
  // you remember that the socket is a duplex stream. so I can recieve and send infomation to it.
  socket.write("A simple message comming from a simple sender!");
});
