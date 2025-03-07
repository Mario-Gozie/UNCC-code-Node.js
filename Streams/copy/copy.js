const fs = require("node:fs/promises");

// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("text-small.txt");

//   console.timeEnd("copy");
//   await destFile.write(result);
// })();

// (async () => {
//   console.time("copy");
//   const srcFile = await fs.open("text-small.txt", "r");
//   const destFile = await fs.open("text-copy.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read(); //This would return buffer.
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== 16384) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0); // getting index of first 0
//       const newBuffer = Buffer.alloc(indexOfNotFilled); // allocating the size of the unfilled index to the new buffer
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled); // copying a buffer to a new buffer
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd("copy");
// })();

(async () => {
  console.time("copy");
  const srcFile = await fs.open("text-small.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // pipes read and write. it handles backpressuring and drain activities. etc.
  // piping must move from a writeable stream to a readable stream.
  readStream.pipe(writeStream);

  console.timeEnd("copy");
})();
