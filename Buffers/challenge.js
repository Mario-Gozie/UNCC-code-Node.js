// 0100 1000 0110 1001 0010 0001

const { Buffer } = require("buffer");

const newMemory = Buffer.alloc(3); // Here I am alocating 3 bytes to the buffer because thatls all nedded for this data. each element in a buffer contains 1 byte which is 8 bit and for this data I want to allocate, we have a total of 3 bytes which is 24 bits.

newMemory[0] = 0x48;
newMemory[1] = 0x69;
newMemory[2] = 0x21;

console.log(newMemory);
console.log(newMemory[0]);
console.log(newMemory[1]);
console.log(newMemory[2]);

console.log(newMemory.toString("utf-8")); //getting the string value of this printed Hi! wow! is that not interesting?

// ANOTHER WAY OF CREATING SAME BUFFER

const buff = Buffer.from([0x48, 0x69, 0x21]); // in this method, the from automatically decides how big this value should be. so it allocates the number of bytes automatically. the from is also a little bit faster but that will be a topic for another day.

console.log(buff.toString("utf-8")); // Please Use the right character encoding. here we used utf-8 which is the standard. if we use utf-16, it will give us a string in another languague.

// ANOTHER WAY OF SPECIFYING THE VALUE

const buffA = Buffer.from("486921", "hex"); //Here I specied the value as a string and asked from to make it binary asuming it was  a hex value. it will also figure out how mahy bytes it needs to make this.
console.log(buffA.toString("utf-8"));

const buffS = Buffer.from("string", "utf-8"); // here I am saying take this as a string, convert as binary
console.log(buffS.toString("utf-8")); //here I am sying give me the string.

const buffH = Buffer.from("Hi!", "utf-8"); // here I am saying take this as a string, convert as binary
console.log(buffH.toString("utf-8")); //here I am sying give me the string.

// TRYING TO HAVE MORE FUN WITH BUFFER
