import fastify from 'fastify';

// base of application
const app = fastify()

// GET, POST, PUT, PATCH, DELETE
// http://localhost:333/hello

app.get("/hello", () => {
  return "Hello!"
})

app.listen({
  port: 3331,
}).then(() => {
  console.log("HTTP Server Running!")
});
