const net = require("net");
// const { buffer } = require("stream/consumers");

const socket = net.createConnection({ host: "localhost", port: 8050 }, () => {
  // you remember that the socket is a duplex stream. so I can recieve and send infomation to it.

  const buff = Buffer.alloc(8);
  buff[0] = 12;
  buff[1] = 34;

  socket.write(buff);
});

socket.on("data", (chunk) => {
  console.log("Recieved responses:");
  console.log(chunk.toString("utf-8"));

  socket.end();
});

socket.on("end", () => {
  console.log("Connection closed");
});
