const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 3008 }, () => {
  console.log("connected to the server!");
});
