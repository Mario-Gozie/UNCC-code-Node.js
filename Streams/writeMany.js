// const fs = require("node:fs/promises");

// the code below takes 1 miniute to run,
// uses 100% of CPU (1 core) and
// 48MB of the memory

// (async () => {
//   console.time("writeMany");
//   // Openening the file
//   const fileHandle = await fs.open("test.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     // writing into the file
//     await fileHandle.write(` ${i} `);
//   }

//   console.timeEnd("writeMany");
// })();

// the code below takes 10 seconds to run,
// uses 100% of CPU (1 core) and
// 48MB of the memory

// const fs = require("node:fs");

// (async () => {
//   console.time("writeMany");
//   // Openening the file
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//       fs.writeSync(fd, buff);
//     }

//     console.timeEnd("writeMany");
//   });
// })();

// MAKING THE CODE FASTER WITH STREAMS

const fs = require("node:fs/promises");

// Streams make codes run faster but DONT USE STREAMS THIS WAY. It is bad practice
// the code below takes 1 miniute to run,
// uses 100% of CPU (1 core) and
// 48MB of the memory

(async () => {
  console.time("writeMany");
  // Openening the file
  const fileHandle = await fs.open("test.txt", "w");

  // creating a write stream of the file

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    // creating a buffer.
    const buff = Buffer.from(` ${i} `, "utf-8");
    // writing the buffer into the file.
    stream.write(buff);
    await fileHandle.write(` ${i} `);
  }

  console.timeEnd("writeMany");
})();
