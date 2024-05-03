
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-\-_]+)');
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}

// método matchAll(): retorna uma classe Iterator do JS (sem log - object)
// Extension: Regex Previewer

// Obs.: It is unlikely that you will create an application from scratch
// Frameworks (micro)
// express
// fastify
// nest
// adonis
