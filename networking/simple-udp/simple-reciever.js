// RECIEVER SIDE OF UDP
const dgram = require("dgram");

const reciever = dgram.createSocket("udp4"); // the parameter specified here udp 4 is for using Ipv4 if we are using Ipv6 then we will use udp6.

reciever.on("message", (message, remoteInfo) => {
  // remote info indicates source ip address, famil, port, size.
  console.log(
    `Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`
  ); // you may get a weird port from this area because when a client make a request from a server. it assigns dynamic addresses. there is a range of dynamic addresses which are 49152 to 65535.
});

// Two different protocols can listen to the same port. for example, having TCP and UDP listening on the same port.

reciever.bind({ address: "127.0.0.1", port: 8000 }); // This is more like a way of connecting the server to the reciever when using UDP

reciever.on("listening", () => {
  console.log(`Server listening: `);
  console.log(reciever.address());
});
