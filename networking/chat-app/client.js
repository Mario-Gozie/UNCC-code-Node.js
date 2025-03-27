const { read } = require("fs");
const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("connected to the server!");

    const message = await rl.question("Enter a message > ");

    socket.write(message);
  }
);

socket.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

socket.on("end", () => {
  console.log("Ended!");
});

// Handle errors on the socket
socket.on("error", (err) => {
  //   console.error("socket error:", err);

  // Check for ECONNRESET and handle it separately
  if (err.code === "ECONNRESET") {
    console.log("The server has closed the connection unexpectedly.");
  } else {
    console.log("An error occurred:", err.message);
  }
});
