// // const fs = require("node:fs/promises");

// // the code below takes 1 miniute to run,
// // uses 100% of CPU (1 core) and
// // 48MB of the memory

// // (async () => {
// //   console.time("writeMany");
// //   // Openening the file
// //   const fileHandle = await fs.open("test.txt", "w");

// //   for (let i = 0; i < 1000000; i++) {
// //     // writing into the file
// //     await fileHandle.write(` ${i} `);
// //   }

// //   console.timeEnd("writeMany");
// // })();

// // the code below takes 10 seconds to run,
// // uses 100% of CPU (1 core) and
// // 48MB of the memory

// // const fs = require("node:fs");

// // (async () => {
// //   console.time("writeMany");
// //   // Openening the file
// //   fs.open("test.txt", "w", (err, fd) => {
// //     for (let i = 0; i < 1000000; i++) {
// //       const buff = Buffer.from(` ${i} `, "utf-8");
// //       fs.writeSync(fd, buff);
// //     }

// //     console.timeEnd("writeMany");
// //   });
// // })();

// // MAKING THE CODE FASTER WITH STREAMS

// // const fs = require("node:fs/promises");

// // Streams make codes run faster but DONT USE STREAMS THIS WAY. It is bad practice
// // the code below takes 1 miniute to run,
// // uses 100% of CPU (1 core) and
// // 48MB of the memory

// // (async () => {
// //   console.time("writeMany");
// //   // Openening the file
// //   const fileHandle = await fs.open("test.txt", "w");

// //   // creating a write stream of the file

// //   const stream = fileHandle.createWriteStream();

// //   for (let i = 0; i < 1000000; i++) {
// //     // creating a buffer.
// //     const buff = Buffer.from(` ${i} `, "utf-8");
// //     // writing the buffer into the file.
// //     stream.write(buff);
// //     await fileHandle.write(` ${i} `);
// //   }

// //   console.timeEnd("writeMany");
// // })();

// /// STREAMS: This is an abstract interface for working with streaming data in Node.js. so this has to do with sending data in chuncks amd this is more efficient than sending everything once.

// // There is Writable stream
// // There is readable stream
// // We have duplex streams that do writin and reading.
// // we also have Transform stream (this is used for modifying data)

// // Understanding writeable and readable streams is the most important thing. others can be understood later.

// // When working with streams (Maybe writeable streams, you write a buffer to the stream and when it is filled, the data is passed on to the new location. A stream has some events, properties, and methods.)

// // Readable streams are used to read data, and can be created with fs.createReadStream which will create the readable stream object. it also has events, propeties and methods. it usuall has a buffer and data is pasd to the stream with stream.push(data) (remember that the data is a buffer) then the data is passed on to the new location with stream.on("data", (chunk)=>) the call back function now puts the data into the new location.

// // If you have a huge amount of data and you want to write it somewhere, it is adviceable to create a readable stream, read it then pass it to a writeable stream this improves use of memory.

// // A writeable stream and a readable steam has only one buffer but a duplex has two. A transform has two too. one for reading and one for writing.

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  // Openening the file
  const fileHandle = await fs.open("test.txt", "w");

  // creating a write stream of the file

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark); // This property of a stream gives you the size of a buffer. which is by default (16kb or 16384 bytes)

  // console.log(stream.writableLength); // This show how much of the buffer that is filled. This will be 0 because nothing is written into the buffer yet

  // const buff = Buffer.from("string");

  // allocating 1 megabyte in bytes to my buffer. remember that 8bits make one byte. each bit is either a 1 or 0

  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte
  // const buff = Buffer.alloc(16383, 10); // allocating a size to my buffer. and filling it with 10
  // console.log(stream.write(buff)); //This will return False because we are alocationg values that fill the internal buffer of the stream.
  // console.log(stream.write(Buffer.alloc(1, "a")));

  // // Drain event happens when an internal buffer is filled and it is emptied
  // stream.on("drain", () => {
  //   console.log(stream.write(Buffer.alloc(1, "a")));
  //   console.log(stream.writableLength);

  //   console.log("we are now safe to write more");
  // });
  // console.log(buff);

  // setInterval(() => {}, 1000);

  // console.log(stream.writableLength); // this will definitely have a value

  let i = 0;

  const numberOfWrites = 10000000;

  const writeMany = () => {
    while (i < numberOfWrites) {
      // creating a buffer.
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write

      if (i === numberOfWrites - 1) {
        return stream.end(buff); // this is used when we are done with a stream
      }

      // if stream.write returns false, stop the loop. This happens when the internal buffer is filled. at this point, the stream is not writeable
      // writing the buffer into the file.
      if (!stream.write(buff)) break;
      i++;
    }
  };

  writeMany();

  // resume our loop once our stream's for internal buffer is empty
  stream.on("drain", () => {
    console.log("drained"); // this is just to see how many times we are draining
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");

    fileHandle.close();
  });
})();
