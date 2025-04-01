const dgram = require("dgram");

const sender = dgram.createSocket("udp4"); // the parameter specified here udp 4 is for using Ipv4 if we are using Ipv6 then we will use udp6.
