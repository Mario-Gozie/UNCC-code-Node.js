const { read } = require("fs");
const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Here I am converting call back version of a method to a promise

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCusor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("connected to the server!");

    const ask = async () => {
      const message = await rl.question("Enter a message > ");

      await moveCusor(0, -1); // here, I am saying move dont move my cusor horizontally (0), but vertically (-1)

      // clear the current line that the cursor is in
      await clearLine(0);

      socket.write(message);
    };

    ask();

    socket.on("data", async (data) => {
      // data us received
      console.log(); // creating an empty line
      moveCusor(0, -1); // moving cursor up
      await clearLine(0); // clearing the left content of the message which is the massage asking to enter value
      console.log(data.toString("utf-8")); // logging the data
      ask(); // asking the ask measage to come up
    });
  }
);

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
