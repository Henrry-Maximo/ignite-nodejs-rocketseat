// buffer: dados armazenados em binário na memória para serem chamados, usandos
// e eliminados

const buf = Buffer.from(
  "Feliz domingo a todos e @Sonic."
);

console.log(buf.toJSON("utf8"));

// Binário
// Hexadecimal

// Os buffers são populados com strings