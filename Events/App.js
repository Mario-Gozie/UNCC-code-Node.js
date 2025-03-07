const EventEmitter = require("./events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("An event occured 1.");
});

myE.on("foo", () => {
  console.log("An event occured 2.");
});

myE.on("foo", (x) => {
  console.log("An event with a prameter occured:");
  console.log(x);
});

myE.on("bar", () => {
  console.log(`An event occured bar.`);
});

myE.emit("foo");
myE.emit("foo", "some text");
