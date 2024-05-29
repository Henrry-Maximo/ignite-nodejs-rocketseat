import fastify from 'fastify';
import axios from 'axios';

// interface animeType {
//   row: string,
// }

interface animeType {
  id: number,
  type: string
}

const app = fastify();
const DATABASES_URL = "https://api.mangadex.org/manga";

async function getAnime() {
  try {
    const response = await axios.get(DATABASES_URL);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

app.get('/anime', async function(request, reply) {
  const data = await getAnime();
  const dataContentAnime = [];
  
  if (!data || data.length === 0) {
    return reply.status(204).send();
  }

  for (const row of data) {
    // console.log(Object.keys(row));
    const data:Array<animeType> = [
      {
        id: row.id,
        type: row.type
      }
    ];

    dataContentAnime.push(data);
  }

  return reply.send(dataContentAnime);
})

app.listen({port: 3334}).then(() => {
  console.log("servidor iniciado!")
})