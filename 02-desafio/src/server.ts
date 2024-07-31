import { app } from './app'

app
  .listen({
    port: 3335,
  })
  .then(() => {
    console.log('Servidor Iniciado!')
  })
