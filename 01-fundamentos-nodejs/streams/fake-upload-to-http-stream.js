import { Readable } from "node:stream";

/* 
front: sending the data to the backend
observation: featch (API) - is a API full for work with request and response 
*/

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        // creating a buffer from a string
        const buf = Buffer.from(String(i));

        this.push(`\n${buf}`);
      }
    }, 1000);
  }
}

/*
sending of Stream only if the method is POST or PUT

#01-example:
fetch("http://localhost:4444", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  response.text().then(data => {console.log(data)
  })
})
*/

// #02-example:
fetch("http://localhost:4444", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
})
.then((response) => { return response.text();})
.then((data) => {console.log(data);});

/* 
in server is possible use the header: "Content-Length"
example: in NodeJS with the framework - Express, you can 
access it inside a "req" object as follows:
const contentLength = parseInt(req.headers['content-length']);

observartion: rest-client(Postman/Insomnia) - allows us to make 
HTTP calls within our machine using some API.
*/