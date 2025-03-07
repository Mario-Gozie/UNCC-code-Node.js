const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = "";

  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split("  "); // converting each chunk into an array

    if (Number(numbers[0]) !== Number(numbers[1] - 1)) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    // Taking care of the last element of an array
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    console.log(numbers);
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
