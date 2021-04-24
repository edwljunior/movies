import { request, response, Router } from 'express';
import axios from 'axios';

const routes = Router();
let lista: any[] = [];
let listaAno: any[] = [];


routes.get('/', async (request,response) => {
  let myMap = new Map();
  let link;
  let contPage = 1;

  do {
    console.log(contPage);
    link = await axios.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${request.query.Title}&page=${contPage++}`);
    lista = [...lista, ...link.data.data]
  } while (contPage <= link.data.total_pages);

  lista.forEach((value, key) => {
    if(myMap.has(value.Year)){
      myMap.set(value.Year,myMap.get(value.Year)+1)
    }
    else{
      myMap.set(value.Year,1)
    }
  })

  myMap.forEach((value,key) => {
    listaAno.push({year:key,movie:value});
  });
  console.log({'movesByYear':listaAno,total:link.data.total});
  response.json({'movesByYear':listaAno,total:link.data.total});
});


export default routes;
