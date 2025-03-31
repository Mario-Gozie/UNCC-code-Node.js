const net = require("net");
const fs = require("node:fs/promises");

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  console.log(process.argv);
  const filePath = "./test.txt";
  const fileHandle = await fs.open(filePath, "r");
  const fileReadStream = fileHandle.createReadStream(); // stream to read from

  // Reading from the source file.
  fileReadStream.on("data", (data) => {
    if (!socket.write(data)) {
      // Checking if the internal buffer of a stream is filled.
      console.log(`client stream buffer filled/backpressuring`);
      fileReadStream.pause();
    }
  });

  socket.on("drain", () => {
    console.log(`client stream buffer drained`);
    fileReadStream.resume();
  });

  fileReadStream.on("end", () => {
    console.log("The file was successfully uploaded!");

    socket.end();
  });
});
