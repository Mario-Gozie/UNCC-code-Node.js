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
      fs.write(this.fd, buffer.concat(this.chunks), (err) => {
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

const stream = new fileWriteStream({
  highWaterMark: 1800,
  fileName: "text.txt",
});

stream.write(Buffer.from("this is some string."));
stream.end(Buffer.from("Our last write."));

stream.on("finish", () => {
  console.log("stream was finished");
});
