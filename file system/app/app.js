// const fs = require("fs/promises");
// // we would like to first watch changes hapening to the file.

// (async () => {
//   // commands
//   const CREATE_FILE = "create a file";

//   const DELETE_FILE = "delete the file";

//   const RENAME_FILE = "rename the file";

//   const ADD_TO_FILE = "add to the file";

//   const createFile = async (path) => {
//     // checking if the file already exist
//     try {
//       const existingFileHandle = await fs.open(path, "r"); // we are not writing into the file but reading because we just want to check if it exists.

//       existingFileHandle.close(); // remember to close a file after opening it.

//       // if the file opens, we already have the file... so the return code will run.
//       return console.log(`The file ${path} already exists.`);
//     } catch (error) {
//       const newFileHandle = await fs.open(path, "w"); //this will create a new file if the file with the path does not exist.

//       console.log("A new file was successfully created");

//       newFileHandle.close();
//     }
//   };

//   const deleteFile = async (path) => {
//     try {
//       await fs.unlink(path); // unlink function is used for deleting here but we could have also used the rm function. the mein difference between the two is that rm fuction has more power, it could delete more than one files and directories that are not empty. while unlink will delete only one file. rmdir is another function that you can use to delete directories only that are empty.

//       console.log(`The file was successfully removed`);
//     } catch (err) {
//       if (err.code === "ENOENT") {
//         console.log(`No file at this path to remove`);
//       } else {
//         console.log("An Error occured while removing the file.");
//       }
//     }
//   };

//   const renameFile = async (oldPath, newPath) => {
//     try {
//       await fs.rename(oldPath, newPath); // This rename can also be used to move a file. if you specify a new path fo rthe file.

//       console.log(`The file was successfully renamed`);
//     } catch (err) {
//       if (err.code === "ENOENT") {
//         console.log(
//           `No file at this path to rename, or the destination doesn't exist`
//         );
//       } else {
//         console.log("An Error occured while removing the file.");
//       }
//     }
//   };

//   let addedContent;

//   const addToFile = async (path, content) => {
//     if (addedContent === content) return;
//     try {
//       const fileHandle = await fs.open(path, "a"); // To append a content to a file, we use the a flag. unlike w for writing and r for reading.
//       fileHandle.write(content);
//       addedContent = content;
//       console.log(`content was added successfully`);
//     } catch (err) {
//       console.log("An error occured while appending info to the file");
//       console.log(err);
//     }
//   };

//   // Opening a file, which is nececesarry to read or write on a file

//   const conmmandFileHandler = await fs.open("./command.txt", "r"); // The r there means I am only going to read the content

//   // Because all file handle objects are event emiters, that is why I am ussing the event emiter. check below. this function will be emitted within the watcher.
//   conmmandFileHandler.on("change", async () => {
//     console.log("The file was changed");

//     // get the size of our file.
//     const size = (await conmmandFileHandler.stat()).size; // getting the size of the file from the statistics method, so we wont alocate excess or less buffer to the file content. this size determines the size of the buffer.
//     console.log(size);

//     // allocate our buffer with size of file to avoid alocation of excess buffer
//     const buff = Buffer.alloc(size);

//     // offset is the location which we want start to start filling our buffer, which is always Zero.
//     const offset = 0;

//     // How many bytes we want to read.
//     const length = buff.byteLength; // the length you want to read.

//     // The Position you want to start reading.
//     const position = 0; // where you want to read from. which is from begining to end.

//     if (size > 0) {
//       const { bytesRead, buffer } = await conmmandFileHandler.read(
//         buff,
//         offset,
//         length,
//         position
//       ); // here we are reading the file

//       console.log("Bytes read", bytesRead);

//       // Using a decoder
//       // Decoder - This turns something that is meaningless to something that is meaningful.
//       // encoder - this turns something that is menaingful to something that is meaningless.
//       const command = buffer.toString("utf-8");

//       // create a file:
//       // create a file <path>

//       if (command.includes(CREATE_FILE)) {
//         const filePath = command.substring(CREATE_FILE.length + 1); // this method will start from after "create a file" length and the space which is represented by 1. from that point till the end. "we are moving to the right."
//         createFile(filePath);
//       }

//       // Delete a file.
//       // delete the file <path>
//       if (command.includes(DELETE_FILE)) {
//         const filePath = command.substring(DELETE_FILE.length + 1);
//         deleteFile(filePath);
//       }

//       // rename file:
//       // rename the file <path> to <path>

//       if (command.includes(RENAME_FILE)) {
//         const _idx = command.indexOf(" to ");
//         const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
//         const newFilePath = command.substring(_idx + 4);

//         renameFile(oldFilePath, newFilePath);
//       }

//       // add to file
//       // add to the file <path> this content: <content>

//       if (command.includes(ADD_TO_FILE)) {
//         const _idx = command.indexOf(" this content: ");
//         const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
//         const content = command.substring(_idx + 15);

//         addToFile(filePath, content);
//       }
//     }
//   });

//   // This is the poit of using the watcher.
//   const watcher = fs.watch("./command.txt"); // the watcher is an asynchronous interator. that is why we had to use a for loop below. this is known as a flag. the flag can also be

//   // in this for loop, we are looking at the whole directory and login all changes to the console.
//   for await (const event of watcher) {
//     if (event.eventType === "change") {
//       //all file handle object are evebt emiiters.
//       conmmandFileHandler.emit("change");
//     }
//   }
// })();
