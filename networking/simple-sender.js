const net = require("net");
const { buffer } = require("stream/consumers");

const socket = net.createConnection({ host: "127.0.0.1", port: 3099 }, () => {
  // you remember that the socket is a duplex stream. so I can recieve and send infomation to it.

  const buff = Buffer.alloc(2);
  buff[0] = 12;
  buff[1] = 34;

  socket.write(buff);
});
