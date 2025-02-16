const { Buffer } = require("buffer");

const buff = Buffer.alloc(10000); // Here I am basically saying that a buffer should be creating 100000 space of elements and fill it with 0. if I am not specific with the 0, it will still fill it with 0. This process of fillling with Zero can be time consuming.

const unsafeBuffer = Buffer.allocUnsafe(10000); // This process is faster than the normal alloc because it doesn't Zero out the whole portion. but there is a disadvantage to this which is that the buffer you would get, may have some existing data inside. hackers may use this process to allocate huge buffers then from there access some of your data which is why this is called unsafe. if you have some sensitive data like password, this process is inefficient.

// THIS WILL SHOW THAT THE BUFFER CONTAINS SOMETHING
// for (let i = 0; i < unsafeBuffer.length; i++) {
//   if (unsafeBuffer[i] !== 0) {
//     //Zerro means it is not allocated. remmember that when you slice element of a buffer, you get a decimal
//     console.log(
//       `Element at position ${i} has value: ${unsafeBuffer[i].toString(2)}` // here I am saying that the string has to be in base 2.
//     );
//   }
// }

// THIS WHICH IS CREATED WITHOUT THE UNSAFE METHOD WILL DEFINITLY BE FREE OF ANY VALUE ALREADY. WE WILL SEE WHEN WE RUN THE CODE THAT THERE WILL BE NOTHING INSIDE.
for (let i = 0; i < buff.length; i++) {
  if (buff[i] !== 0) {
    //Zerro means it is not allocated. remmember that when you slice element of a buffer, you get a decimal
    console.log(
      `Element at position ${i} has value: ${buff[i].toString(2)}` // here I am saying that the string has to be in base 2.
    );
  }
}
