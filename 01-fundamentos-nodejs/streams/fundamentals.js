/*
Stream: view content in small parts of something and 
work with the file without fully charging.

Examples that use Streams: Netflix and Spotify. 
Netflix & Spotify

importing customers via CSV (Excel)
1GB: 1.000.000
POST /upload import.csv
10mb/s - 100s
100s -> Inserções no banco de dados
10mb/s --> 10.000

read the data little by little and continue 
processing while the file is being uploaded.

Readable Streams: user sent the demand, and we are slowly reading it
Writable Streams: back-end sent little by little tha information for the front
Door of Input/Output: req, res;
Streams --> Treat the DATA / stdin (Duplex Stream)

Stream connected to the terminal:
"process.stdin": entrada / 
"pipe()": para / 
"process.stdout": saída /
process.stdin.pipe(process.stdout)
*/

// Stream Read / Stream Write
import { Readable, Writable, Transform, Duplex } from 'node:stream';

// class: which hold functions and will inherit Node Js internal Readable methods
// Stream: aims to send data/provide information
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    // setTimeout to run after a while
    setTimeout(() => {
      // stream: working with the data before they are even complete
      if (i > 100) {
        // provide information to those who are consuming (Readable Stream): method push()
        this.push(null)
      } else {
        const buf = Buffer.from(String(i));
        this.push(`\n${buf}`);
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    // o callback receber dois parâmetros:
    //  - erro: new Error("Number Not Valid!")
    // os dados em si, o que foi transformado
    callback(null, Buffer.from(String(transformed)))
    // this.push(Buffer.from(String(transformed)));
    // callback();
    // precisa enviar como Buffer / Buffer: um módulo do node utilizado para transitar informações
  }
}

// apenas processar o dado, não transformar.
class MultiplyByTenStream extends Writable {
  // método _write: recebe três parâmetros - CHUNK, ENCODING AND CALLBACK
  // chunk: pedaço que a leu na stream de leitura
  // encoding: como a informação está codificado
  // callback: função que a stream de escrita precisa chamar, quando terminou de fazer o que precisava com aquela informação
  _write(chunk, encoding, callback) {
    // converter para string, pois está em Buffer e converter também, para número
    // Writable não deve ser usado para transformar - apenas para didática
    console.log(Number(chunk.toString()) * 10);
    callback(); // encerrar
  }
}

// formato específico dos dados = buffer
// new OneToHundredStream().pipe(process.stdout);

// Stream Read encaminha para a Stream Write
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream());

// Stream Duplex: Abrange os métodos de Leitura e Escrita
// Arquivo físico: ler/escrever; porém não pode transformar

// por que não usar o Stream Write pra transformar?
// porque Stream Write não é uma subclasse de Duplex, mas sim de Stream, ou seja, não possui as funcionalidades para trabalhar
// com simultaniedade. Enquanto que _transform é uma subclasse de Duplex, que é uma subclasse da classe Stream