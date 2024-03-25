export async function json(request, response) {
  // Leitura de Streams Completa
  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  } 
  
  // receber os dados - tratar o corpo da requisição / convertendo de buffer para json
  try {
    request.body  = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader("Content-type", "application/json")
}