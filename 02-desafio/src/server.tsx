import fastify from 'fastify';
import axios from 'axios';

interface animeType {
  row: string,
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
  return reply.send(data);
})

app.listen({port: 3334}).then(() => {
  console.log("servidor iniciado!")
})