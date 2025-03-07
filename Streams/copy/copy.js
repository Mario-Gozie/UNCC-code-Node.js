const { pipeline } = require("node:stream");
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

  // console.log(readStream.readableFlowing); // This is used to check if the data is being read

  // // pipes read and write. it handles backpressuring and drain activities. etc.

  // // piping must move from a writeable stream to a readable stream.
  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing); // This will show true because data is being read here.

  // readStream.unpipe(writeStream); // unpipe basically remove the destination which is the file we are writting to.

  // console.log(readStream.readableFlowing); // This will show false because unpipe has removed the writing stream above.

  // // if you pipe and unpipe, the stream will resume from where it stopped
  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // // This can be implemented when reading is done.
  // readStream.on("end", () => {
  //   console.timeEnd("copy");
  // });

  // USING PIPELINE. This takes th readable and writeable strem then the error callback function.

  pipeline(readStream, writeStream, (err) => {
    console.log(err); // this will show undefined if there is no error
    console.timeEnd("copy");
  });
})();

// pipeline is better to be used than pipe because it does error handling. This usually call the stream.destroy(err) on all streams to destroy it after piping is done.
