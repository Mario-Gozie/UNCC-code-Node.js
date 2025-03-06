// const { Buffer } = require("buffer"); // including the buffer object in our work

// const memoryContainer = Buffer.alloc(4); // Allocating a value for our buffer. here we are alocating 4 bytes. So by doing this, we are creating a buffer memory. so the size of this buffer is 4 bytes or 32bits.

// // Remember that a buffer acts like an array. it has elements in it and each element holds 8 bits which is 1 byte. in otherwords each elements will have 8 zeros.

// // ACCESSING ELEMENTS IN OUR BUFFER BY SLICING

// console.log(memoryContainer); // logging The buffer to the console will showw the buffer having zeros. each of the elements will have 2 zeros (displaying values in hexadecimal).

// console.log(memoryContainer[0]); // Accessing the first element. This will show only one Zero

// // Writing Values in Elements of the buffer. Remember that buffers are more like arrays. I am going to write it in Hexadecimal.
// memoryContainer[0] = 0xf4; // This means in the first Elements of my buffer, write 0xf4
// memoryContainer[1] = 0x34;
// memoryContainer[2] = 0xb6;
// memoryContainer[3] = 0xff;

// console.log(memoryContainer); // This will show the buffer Values in Hexadecimal format

// console.log(memoryContainer[0]); // Accessing the first element. This will show result in Deximal even though the value was inputed in hexadecimal format.
// console.log(memoryContainer[1]);
// console.log(memoryContainer[2]);
// console.log(memoryContainer[3]);

// // The minimum value a buffer element will hold in decimal is 0 and the maximum is 255. this is because FF in hexadecimal is equal to 1111 1111 in binary which is same as 255. remember that each element in a buffer can hold only 8 bits which is 1 byte.

// console.log(memoryContainer.toString("hex")); // Here I am saying give me the string value of my buffer in hexadecimal format.
