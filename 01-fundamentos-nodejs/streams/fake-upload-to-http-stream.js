import { Readable } from "node:stream";

// FRONT-END: Enviando os dados para o BACK-END
// Featch API | Nativo NodeJS = é uma API completa para trabalhar com requisições e respostas

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        // criar uma buffer apartir de uma string
        const buf = Buffer.from(String(i));

        this.push(`\n${buf}`);
      }
    }, 1000)

  }
}

// A Stream só pode ser enviada se o método POST ou PUT
// fetch("http://localhost:4444", {
//   method: "POST",
//   body: new OneToHundredStream(),
//   duplex: 'half'
// }).then(response => {
//   response.text().then(data => {console.log(data)
//   })
// })

fetch("http://localhost:4444", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data);
})

// Isso pode ser feito no lado do servidor utilizando o header "Content-Length". 
// Por exemplo, em Node.js com o framework Express, você pode acessá-lo dentro do objeto "req" da seguinte forma:
// const contentLength = parseInt(req.headers['content-length']);


// REST CLIENT - INSOMNIA: PERMITE FAZER CHAMADAS HTTP DENTRO DA NOSSA MÁQUINA EM ALGUMA API