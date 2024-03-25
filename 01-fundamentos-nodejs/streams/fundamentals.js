// Netflix & Spotify

// Stream: visualizar o conteúdo em pequenas partes de alguma coisa, e conseguir trabalhar com aquele arquivo
// sem ter o carregamento completo

// Importação de Clientes via CSV (Excel)
// 1GB - 1.000.000
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s --> 10.000

// ler os dados recebidos aos poucos e ir processando enquanto o arquivo ainda está em upload. 

// Readable Streams: usuário enviou a demanda, e estamos lendo aos poucos 
// Writable Streams: back enviando aos poucos a informação ao front


// Porta de Entrada/Saída: req, res;

// Streams -> Tratar os Dados / stdin (Duplex Stream)
// stream conectada ao terminal:
// "process.stdin": receber o que vem da entrada / "pipe()": encaminhando para / "process.stdout": uma stream de saída - escrevendo
// process.stdin.pipe(process.stdout)
// Stream Read / Stream Write

// Stream Read / Stream Write
import { Readable, Writable, Transform, Duplex } from 'node:stream';

// class que manterá funções e herdará os método do Readable interno do NodeJS
// Stream de dados: tem como objetivo enviar dados/fornecer informações
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    // Executar o código depois de um tempo
    setTimeout(() => {
      // Stream: trabalhando com os dados antes mesmo de estarem completos
      if (i > 100) {
        // fornecer informações para quem estiver consumindo (quando se utilizar Readable Stream): método push()
        this.push(null)
      } else {
        const buf = Buffer.from(String(i));

        this.push(`\n${buf}`);
      }
    }, 1000)

    // console.log(i);
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