// criando regex dos parâmetros (expressão regular)
// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '([a-z0-9-\-_]+)');

  // console.log(pathWithParams)
  // const test = /\/users\/([a-z0-9--_]+)/

  // return new RegExp()
  // console.log(Array.from(path.matchAll(routeParametersRegex)))
  // o sinal significa que deve começar com o regex
  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}

// método matchAll(): retorna uma classe Iterator do JS (sem log - object)

// Extension: Regex Previewer


// Obs.: dificilmente você criará uma aplicação do zero
// Frameworks (micro)
// express
// fastify
// nest
// adonis
