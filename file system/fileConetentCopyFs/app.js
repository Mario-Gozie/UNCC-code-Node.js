// There are actually 3 ways to do something in Node.js. you either use Promises API, Callback API and Synchronous API. in all this, The Asynchronous API is the best and also fast. Both Asynchronous API and callBack API are faster than Synchronous API.

// **********Promise API ***********//

// const fs = require("fs/promises");

// (async () => {
//   try {
//     await fs.copyFile("file.txt", "copied-promise.txt");
//   } catch (error) {
//     console.log(error);
//   }
// })();

// ******* Callback API **************//

// const fs = require("fs");

// fs.copyFile("file.txt", "copied-callback.txt", (error) => {
//   // while working with callbacks in node you pass in the error as a call back fucntion. this is a common practice in node.js.
//   if (error) console.log(error);
// });

// ******* Synchronous API *************//

const fs = require("fs");

fs.copyFileSync("file.txt", "copied-sync.txt"); // Sychronous API always have Sync attached to it. which is one of the difference between it and others. it doesnt have any kind of error handling at all so if anything goes wrong, the application stops.
