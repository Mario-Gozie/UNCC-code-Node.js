const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause(); // So what we are saying here is that if the write stream buffer is full, pause reading so no data will be recieved.
    }

    // console.log("---------------");
    // console.log(chunk.length);
  });

  streamWrite.on("drain", () => {
    streamRead.resume(); // here I am saying that after draining, start readin so that data will be recieved.
  });

  //   stream.on("end", () => {});
})();
