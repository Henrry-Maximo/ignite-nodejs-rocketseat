// Buffer: data stored in binary in memory to be recalled, used and deleted
// ler parcialmente os dados de forma binária
const buf = Buffer.from(
  "RocketSeat Is Very Good!"
);

// Binário && Hexadecimal
console.log(buf.toJSON("utf8"));
// The Buffers are populated with strings

// Native -> TypedArray

// Use `toJSON()` for convert the value in decimal (not hexadecimal)