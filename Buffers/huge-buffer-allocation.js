const { Buffer, constants } = require("buffer");

const b = Buffer.alloc(1e9); // 1e9 is equal to one gigabyte. it is just the byte value for gigabyte

console.log(constants.MAX_LENGTH); // This will tell you how much of a buffer you can allocate. which is usually 4 gigabytes. This is the maximum amout of memory I can allocate for my node process.

setInterval(() => {
  // WITH THIS METHOD, I FILLED ALL ELEMENTS OF MY BUFFER WITH THE FOR LOOP
  //   for (let i = 0; i < b.length; i++) {
  //     // b.length is the size of the buffer in bytes.
  //     b[i] = 0x22;
  //   }

  // THERE IS A QUICKER WAY TO DO THAT WHICH IS USING THE FILL MEHTOD

  b.fill(0x22);
}, 5000);
