const fs = require("node:fs/promises");

(async () => {
  console.time("readBig");
  const fileHandleRead = await fs.open("text-small.txt", "r");
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

    numbers.forEach((num) => {
      let n = +num;
      if (n % 10 === 0) {
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause(); // So what we are saying here is that if the write stream buffer is full, pause reading so no data will be recieved.
        }
      }
    });
  });

  streamWrite.on("drain", () => {
    streamRead.resume(); // here I am saying that after draining, start readin so that data will be recieved.
  });

  // Note that the readable stream has the End event while the writeable stream has the finish Event, and the finish event is called after calling the calling the end event.
  streamRead.on("end", () => {
    console.log("Done Reading");
    console.timeEnd("readBig");
  });
})();
