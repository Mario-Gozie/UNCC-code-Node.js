// fs module is used in reading a file.

const fs = require("fs");

const content = fs.readFileSync("./text.txt"); // Path for the file to be read

// console.log(content); // Running this code on the console will give hexagonal data and we can convert it to text. remember that each charact takes 8bit or 1byte as it may be called.

console.log(content.toString("utf-8")); // This converts the binary to text.
