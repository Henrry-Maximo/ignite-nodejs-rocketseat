// criando regex dos parâmetros (expressão regular)
// /users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  // $1 = pegar o nome da route parameters declarada na route após a vírgula
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-\-_]+)');

  // console.log(pathWithParams)
  // const test = /\/users\/([a-z0-9--_]+)/

  // return new RegExp()
  // console.log(Array.from(path.matchAll(routeParametersRegex)))
  // o sinal significa que deve começar com o regex
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  // criar um novo grupo na regex (?<query>)? - para tornar opcional, utilizar "?" fora dos parentêsses
  // $ = URL precisa terminar com essa verificação
  // query parameter começa com ponto de interrogação: \\?
  // (.*) = qualquer caracter && inúmera vezes

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
