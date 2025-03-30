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

let id;

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("connected to the server!");

    const ask = async () => {
      const message = await rl.question("Enter a message > ");

      await moveCusor(0, -1); // here, I am saying move dont move my cusor horizontally (0), but vertically (-1)

      // clear the current line that the cursor is in
      await clearLine(0);

      socket.write(`${id}-message-${message}`);
    };

    ask();

    socket.on("data", async (data) => {
      console.log(); // creating an empty line
      moveCusor(0, -1); // moving cursor up
      await clearLine(0); // clearing the left content of the message which is the massage asking to enter value

      //when we are getting the id ...
      // checking if the first two characters of the data is id, so you can Identify the data recieved as an Id.
      if (data.toString("utf-8").substring(0, 2) === "id") {
        id = data.toString("utf-8").substring(3); // this is goint to gettting only the id which is everything from the third character.

        console.log(`Your id is ${id}!`);
        console.log();
      } else {
        console.log(data.toString("utf-8")); // logging the data
      }
      ask(); // asking the ask measage to come up
    });
  }
);

socket.on("end", () => {
  console.log("Ended!");
});

