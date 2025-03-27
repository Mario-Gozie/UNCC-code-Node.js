const net = require("net");

const client = net.createConnection({ host: "127.0.0.1", port: 3008 }, () => {
  console.log("connected to the server!");
});

client.on("end", () => {
  console.log("Ended!");
});

// Handle errors on the client socket
client.on("error", (err) => {
  //   console.error("Client error:", err);

  // Check for ECONNRESET and handle it separately
  if (err.code === "ECONNRESET") {
    console.log("The server has closed the connection unexpectedly.");
  } else {
    console.log("An error occurred:", err.message);
  }
});
