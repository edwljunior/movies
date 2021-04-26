import { request, response, Router } from 'express';
import axios from 'axios';

const routes = Router();


routes.get('/api/movies/count', async (request, response) => {
  let lista: any[] = [];
  let myMap = new Map();
  let link;
  let contPage = 1;
  let listaAno: any[] = [];
  do {
    link = await axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${request.query.Title}&page=${contPage++}`);
    lista = [...lista, ...link.data.data]
  } while (contPage <= link.data.total_pages);

  lista.forEach((value, key) => {
    if (myMap.has(value.Year)) {
      myMap.set(value.Year, myMap.get(value.Year) + 1)
    }
    else {
      myMap.set(value.Year, 1)
    }
  })

  myMap.forEach((value, key) => {
    listaAno.push({ year: key, movie: value });
  });
  response.json({ 'moviesByYear': listaAno, total: link.data.total });
});

routes.get('/api/movies/moviesByYear', async (request, response) => {
  const link = await axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${request.query.Title}&page=${request.query.page}&Year=${request.query.year}`);
  response.json(link.data);
})

export default routes;
