export async function json(request, response) {
  // complete Streams reading
  const buffers = [];
  for await (const chunk of request) {
    console.log(`Chuck: ${chunk}`);
    console.log(`Request: ${request}`);
    buffers.push(chunk);
    console.log(buffers);
  } 
  
  // receive the data: treat the body of request /buffer for json
  try {
    request.body  = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader("Content-type", "application/json")
}