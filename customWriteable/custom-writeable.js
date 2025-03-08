const { Writable } = require("node:stream");
const fs = require("node:fs");

class fileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null; // this is known as file descriptor. this is just a number.
    this.chunks = [];
    this.chuksSize = 0;
    this.writesCount = 0;
  }

  // This will run after the constructor, and it will put off calling all the other methods untill we call the callback function.
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        // so if we call the call back with an arguement, it means we have an error so we should not proceed
        callback(err);
      } else {
        this.fd = fd;

        // No arguement means it was successfull.
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chuksSize += chunk.length;

    if (this.chuksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chuksSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      // when we're done, we should call the callback function
      callback();
    }
    // do our write operations ....
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      ++this.writesCount;
      this.chunks = [];

      callback();
    });
  }

  _destroy(error, callback) {
    console.log("Number of writes: ", this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

(async () => {
  console.time("writeMany");

  // creating a write stream of the file

  const stream = new fileWriteStream({
    fileName: "text.txt",
  });

  console.log(stream.writableHighWaterMark); // This property of a stream gives you the size of a buffer. which is by default (16kb or 16384 bytes)

  let i = 0;

  const numberOfWrites = 1000000;

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
  let NoOfDrains = 0;
  stream.on("drain", () => {
    ++NoOfDrains;
    writeMany();
  });

  stream.on("finish", () => {
    console.log("Number of Drains", NoOfDrains); // this is just to see how many times we are draining
    console.timeEnd("writeMany");
  });
})();
