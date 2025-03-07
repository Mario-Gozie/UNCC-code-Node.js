const fs = require("node:fs/promises");

// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("text-small.txt");

//   console.timeEnd("copy");
//   await destFile.write(result);
// })();

(async () => {
  console.time("copy");
  const destFile = await fs.open("text-copy.txt", "w");
  const result = await fs.readFile("text-small.txt");

  console.timeEnd("copy");
  await destFile.write(result);
})();
