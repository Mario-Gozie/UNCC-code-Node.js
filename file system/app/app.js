const fs = require("fs/promises");
// we would like to first watch changes hapening to the file.

(async () => {
  const watcher = fs.watch("./"); // the watcher is an asynchronous interator. that is why we had to use a for loop below

  // in this for loop, we are looking at the whole director and login all changes to the console.
  for await (const event of watcher) {
    console.log(event);
  }
})();
