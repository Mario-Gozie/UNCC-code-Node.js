const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 10,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    streamWrite.write(chunk);
    // console.log("---------------");
    // console.log(chunk.length);
  });

  //   stream.on("end", () => {});
})();
