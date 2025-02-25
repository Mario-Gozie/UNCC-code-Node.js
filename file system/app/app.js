const fs = require("fs/promises");
// we would like to first watch changes hapening to the file.

(async () => {
  // commands
  const CREATE_FILE = "create a file";

  const DELETE_FILE = "delete a file";

  const RENAME_FILE = "rename the file";

  const ADD_TO_FILE = "add the the file";

  const createFile = async (path) => {
    // checking if the file already exist
    try {
      const existingFileHandle = await fs.open(path, "r"); // we are not writing into the file but reading because we just want to check if it exists.

      existingFileHandle.close(); // remember to close a file after opening it.

      // if the file opens, we already have the file... so the return code will run.
      return console.log(`The file ${path} already exists.`);
    } catch (error) {
      const newFileHandle = await fs.open(path, "w"); //this will create a new file if the file with the path does not exist.

      console.log("A new file was successfully created");

      newFileHandle.close();
    }
  };

  const deleteFile = (path) => {
    console.log(`Deleting ${path}...`);
  };

  const renameFile = (oldPath, newPath) => {
    console.log(`Renaming ${oldPath} to ${newPath}...`);
  };

  const addToFile = (path, content) => {
    console.log(`Adding to ${path}`);
    console.log(`Content: ${content}`);
  };

  // Opening a file, which is nececesarry to read or write on a file

  const conmmandFileHandler = await fs.open("./command.txt", "r"); // The r there means I am only going to read the content

  // Because all file handle objects are event emiters, that is why I am ussing the event emiter. check below. this function will be emitted within the watcher.
  conmmandFileHandler.on("change", async () => {
    console.log("The file was changed");

    // get the size of our file.
    const size = (await conmmandFileHandler.stat()).size; // getting the size of the file from the statistics method, so we wont alocate excess or less buffer to the file content. this size determines the size of the buffer.
    console.log(size);

    // allocate our buffer with size of file to avoid alocation of excess buffer
    const buff = Buffer.alloc(size);

    // offset is the location which we want start to start filling our buffer, which is always Zero.
    const offset = 0;

    // How many bytes we want to read.
    const length = buff.byteLength; // the length you want to read.

    // The Position you want to start reading.
    const position = 0; // where you want to read from. which is from begining to end.

    if (size > 0) {
      const { bytesRead, buffer } = await conmmandFileHandler.read(
        buff,
        offset,
        length,
        position
      ); // here we are reading the file

      console.log("Bytes read", bytesRead);

      // Using a decoder
      // Decoder - This turns something that is meaningless to something that is meaningful.
      // encoder - this turns something that is menaingful to something that is meaningless.
      const command = buffer.toString("utf-8");

      // create a file:
      // create a file <path>

      if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1); // this method will start from after "create a file" length and the space which is represented by 1. from that point till the end. "we are moving to the right."
        createFile(filePath);
      }
    } else {
      console.log("File is empty");
    }
  });

  // This is the poit of using the watcher.
  const watcher = fs.watch("./command.txt"); // the watcher is an asynchronous interator. that is why we had to use a for loop below. this is known as a flag. the flag can also be

  // in this for loop, we are looking at the whole directory and login all changes to the console.
  for await (const event of watcher) {
    if (event.eventType === "change") {
      //all file handle object are evebt emiiters.
      conmmandFileHandler.emit("change");
    }

    // Delete a file.
    // delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }
  }
})();
