
import fs from "node:fs/promises";
const databasePath = new URL("db_tasks.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8").then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
        this.#persist();
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
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
}
