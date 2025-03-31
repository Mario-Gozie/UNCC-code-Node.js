const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

let fileHandle, fileWriteStream; // These things are defined there to avoid scope issue. in other words, using it within a function.

server.on("connection", (socket) => {
  console.log("New Connection!");

  socket.on("data", async (data) => {
    // Checking if fileHandle is open and if it is I write directly. if it is not, I open before I write.
    if (!fileHandle) {
      socket.pause(); // pause recieving data from the client
      fileHandle = await fs.open(`storage/test.txt`, "w");
      fileWriteStream = fileHandle.createWriteStream(); // stream to write to

      // Writing to our destination file
      fileWriteStream.write(data);

      socket.resume();

      fileWriteStream.on("drain", () => {
        console.log(`server stream buffer drained`);
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        // checking if the internal buffer of a writeable stream is filled.
        console.log(`server stream buffer filled / backpressureing`);
        socket.pause();
      }
    }
  });

  // This event runs when the client file ends the socket.

  socket.on("end", () => {
    console.log("Connection ended!");
    // fileHandle = undefined;
    // fileWriteStream = undefined;

    fileHandle.close();
  });
});

server.listen(5050, "::1", () => {
  console.log("Uploader server opened on", server.address());
});
