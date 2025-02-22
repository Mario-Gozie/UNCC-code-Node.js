const fs = require("fs/promises");
// we would like to first watch changes hapening to the file.

(async () => {
  // Opening a file

  const conmmandFileHandler = await fs.open("./command.txt", "r"); // The r there means I am only going to read the content
  const watcher = fs.watch("./command.txt"); // the watcher is an asynchronous interator. that is why we had to use a for loop below. this is known as a flag. the flag can also be

  // in this for loop, we are looking at the whole director and login all changes to the console.
  for await (const event of watcher) {
    if (event.eventType === "change") {
      // The file was changed...
      console.log("The file was changed");

      // We want to read the content
      // To read or write in a file content, you need to open it first. when you open a file, we give it a descriptor, or assingn a number or unique Identifier to it. which ever way you understand. see where we opened the file above

      // get the size of our file.

      const size = (await conmmandFileHandler.stat()).size; // getting the size of the file from the statistics method, so we wont alocate excess or less buffer to the file content. this size determines the size of the buffer.
      console.log(size);

      const buff = Buffer.alloc(size);

      const offset = 0; // offset means what quantity do you want to leave aside.
      const length = buff.byteLength - offset; // the length you want to read.
      const position = 0; // where you want to read from

      // buff is buffer, length is number of bytes to read. offset is the location in the buffer we want to start to fill and in our case we want it to be Zero. the length is number of bytes we want to read and this should be the length of our file. because in each read, we want to read the whole content of our file. position is the location we want to start reading from in the file and we always want it to be Zero.

      if (size > 0) {
        const { bytesRead, buffer } = await conmmandFileHandler.read(
          buff,
          offset,
          length,
          position
        ); // here we are reading the file

        console.log("Bytes read", bytesRead);
        console.log("Contents", buffer.toString());
      } else {
        console.log("File is empty");
      }
    }
  }
})();
