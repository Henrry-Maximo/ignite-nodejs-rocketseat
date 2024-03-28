// import fs from "node:fs"; // padrão de assincronimos antigo - Utilizando Callback, função por parâmetro
import fs from "node:fs/promises" // novo formato de assincronimos do JS - Trabalhar: then, catch, async, await
// fs/promises - não tem métodos de streamins

// diretório para chegar ao arquivo database
// console.log(import.meta.url)

// funções antigas:
// console.log(__dirname);
// console.log(__filename);

// Construtor - URL
// Classe Interna / dois parâmetros / criação relativa ao database.js
const databasePath = new URL("db.json", import.meta.url);
// primeiro parâmetro funciona como cd

// { "users": [ ... ]}
export class Database {
  // banco de dados pra qualquer dado, não somente usuário (+genérico)
  #database = {}; // propriedade - object
  // adiciona cerquilha para tornar a propriedade privada

  constructor() {
    fs.readFile(databasePath, "utf-8").then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
        this.#persist();
    })
  }

  // método: escrever o banco de dados em um arquivos físico
  // writeFile aceita somente string
  // por padrão, o node captura o diretório de inicialização do servidor
  // para criação do arquivo
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  // select
  select(table, search) {
    // se existi uma tabela com este nome, se não existir, retorna vazio
    let data = this.#database[table] ?? [];
    // let it change

    // { name: "Diego", email: "Diego"}
    // [ [ "name", "Diego" ], ["email", "Diego"] ]
    // some: desestruturar

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          // linha na propriedade key incluir value
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data;
  }

  // método
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  // método
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      // selecionando a tabela e removendo a linha retornada, somente está linha
      this.#database[table].splice(rowIndex, 1)
      // salvar no banco de dados
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      // enviando o id e as informações
      // acessando a key users e o indice do array (id)
      this.#database[table][rowIndex] = { id, ...data }
      // salvar no banco de dados
      this.#persist();
    }
  }
}
