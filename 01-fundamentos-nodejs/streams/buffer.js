// Buffer: data stored in binary in memory to be recalled, used and deleted
// ler parcialmente os dados de forma binária
const buf = Buffer.from(
  "RocketSeat Is Very Good!"
);

// Binário && Hexadecimal
console.log(buf.toJSON("utf8"));
// The Buffers are populated with strings

// JS have a problem of not be performative with data binary (hexadecimal)
// TypedArray  -> Module native for working with read and write in memory of the browser
// write and read in memory, method simple using comunication at format binary

const nameFormattingInBuffer = Buffer.from("Henrique");
console.log(nameFormattingInBuffer); // <Buffer 48 65 6e 72 69 71 75 65>

console.log(buf.toJSON());  // Append format decimal
// { 
//    type: 'Buffer', 
//    data: [
//            82, 111,  99, 107, 101, 116,  83, 
//            101,  97, 116,  32,  73, 115,  32, 
//            86, 101, 114, 121,  32,  71, 111, 
//            111, 100,  33
//    ]
// }
// Memory computer -> work only with values binary