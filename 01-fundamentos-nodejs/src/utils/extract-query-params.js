// ?search=Diego
// substr(1): remover o primeiro caracter
// tratar os casos de dois parâmetros Diego&page=2 = usar split() para transformar em um array
// resultado: ['search=Diego', 'page=2']
// utilizar reduce para percorrer o array e transformar em outra coisa (ex.: object)
// queryParams: estrtura {}, adicionar conteúdo
export function extractQueryParams(query) {
  return query.substr(1).split("&").reduce((queryParams, param) => {
    // split: dividir em dois (page=2) - ['page', '2']
    const [ key, value ] = param.split('=');
    // resultado: ['search', 'Diego'] ['page', '2']

    queryParams[key] = value;
    // resultado: { search: 'Diego', page: '2' }

    return queryParams;
  }, {})
}