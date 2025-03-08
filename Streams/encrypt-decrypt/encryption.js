// encryption/desctyption == puting data in a format that wont be understood by an outsider
// compression == making data Smaller
// hashing/salting == Hashing is turning a message into a fixed length string of character using mathematical function this is used to secure password. Salting is adding extra layer for security to password before harshing.
// decoding/encoding == converting a binry into a meaningful thing which could be text, video, image, etc.

// MODULES USED FOR THESE PROCESSES.
// encryption/desctyption == crypto
// compression == crypto
// hashing/salting == zlib
// decoding/encoding == buffer text-encoding/decoding

const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      for (let i = 0; i < chunk.length; ++i) {
        if (chunk[i] !== 255) {
          chunk[i] = chunk[i] + 1;
        }
      }
      // Log the chunk for debugging
      console.log(chunk.toString("utf-8"));

      // Push the chunk to the next stream
      this.push(chunk);

      // Call the callback without arguments to indicate success
      callback();
    } catch (error) {
      // Handle any errors that occur during transformation
      callback(error);
    }
  }
}

(async () => {
  try {
    const readFileHandle = await fs.open("read.txt", "r");
    const writeFileHandle = await fs.open("write.txt", "w");

    const readStream = readFileHandle.createReadStream();
    const writeStream = writeFileHandle.createWriteStream();
    const encrypt = new Encrypt();
    readStream.pipe(encrypt).pipe(writeStream);

    // Handle finish event
    writeStream.on("finish", () => {
      console.log("File has been encrypted and saved.");
    });
  } catch (err) {
    console.log("error", err);
  }
})();
