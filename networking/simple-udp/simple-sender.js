const dgram = require("dgram");

const sender = dgram.createSocket("udp4"); // the parameter specified here udp 4 is for using Ipv4 if we are using Ipv6 then we will use udp6.

sender.send("This is a string", 8000, "127.0.0.1", (error, bytes) => {
  // This send method takes a message, port, IP address, and a callback function which has two parameters which are error and bytes.
  if (error) console.log(error);
  console.log(bytes);
});
