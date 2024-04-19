import fs from "node:fs";
import { parse } from "csv-parse";

// 01: caminho do arquivo;
// 02: leitura do arquivo;
// 03: definir tratamento dos dados;
// 04: percorrer os dados;
// 05: inserir os dados - fetch.

const csvFilePath = new URL("./data.csv", import.meta.url);

if (!fs.existsSync(csvFilePath)) {
  console.log("Arquivo não encontrado!");
}

const csvFileRead = fs.createReadStream(csvFilePath).pipe(
  parse({
    delimiter: [",", ";"],
    skipEmptyLines: true,
    fromLine: 2,
  })
);

async function run() {
  const linesTasks = csvFileRead;
  // console.log(linesTasks)
  for await (const line of linesTasks) {
    const [title, description] = line;

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
};

run();
