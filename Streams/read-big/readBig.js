const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("test.txt", "r");

  const stream = fileHandleRead.createReadStream({ highWaterMark: 400 });

  stream.on("data", (chunk) => {
    console.log("---------------");
    console.log(chunk.length);
  });
})();
