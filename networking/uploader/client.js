const net = require("net");
const fs = require("node:fs/promises");

const path = require("path");

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

console.log(); // just an empty line to get space.

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  console.log(process.argv); // This will reveal everything specified while running this software in an array. in other words, all arguments in the process. so if I am running the code with "node client.js". The node path will be the first content of the array while the client.js path will be the second content of the array.

  const filePath = process.argv[2]; // getting the third value of the array which is its the specified file name

  const fileName = path.basename(filePath); // getting just the file name.
  const fileHandle = await fs.open(filePath, "r");
  const fileReadStream = fileHandle.createReadStream(); // stream to read from
  const fileSize = (await fileHandle.stat()).size;

  // For showing the upload progress
  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  socket.write(`fileName: ${fileName}-------`); // writing to the server
  // Reading from the source file.
  fileReadStream.on("data", async (data) => {
    if (!socket.write(data)) {
      // Checking if the internal buffer of a stream is filled.
      console.log(`client stream buffer filled/backpressuring`);
      fileReadStream.pause();
    }

    bytesUploaded += data.length; // added the number of bytes read to the variable

    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

    if (newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage;
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(`Uploading... ${uploadedPercentage}%`);
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
