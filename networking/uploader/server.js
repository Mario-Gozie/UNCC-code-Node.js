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

      const indexOfDivider = data.indexOf("-------");
      const fileName = data.subarray(10, indexOfDivider).toString("utf-8"); // we used toString here because we know that the data will be a buffer normally we can run some array functions on them.

      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileWriteStream = fileHandle.createWriteStream(); // stream to write to

      // Writing to our destination file, discard the headers
      fileWriteStream.write(data.subarray(indexOfDivider + 7));

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
