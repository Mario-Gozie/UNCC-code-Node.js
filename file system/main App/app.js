// There are actually 3 ways to do something in Node.js. you either use Promises API, Callback API and Synchronous API. in all this, The Asynchronous API is the best and also fast. Both Asynchronous API and callBack API are faster than Synchronous API.

// **********Promise API ***********//

const fs = require("fs/promises");

(async () => {
  try {
    await fs.copyFile("file.txt", "copied-promise.txt");
  } catch (error) {
    console.log(error);
  }
})();

// ******* Callback API **************//

// const fs = require("fs");

// fs.copyFile("file.txt", "copied-callback.txt", (error) => {
//   if (error) console.log(error);
// });

// ******* Synchronous API *************//

// const fs = require("fs");

// fs.copyFile("file.txt", "copied-sync.txt");
