import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';

const app = express();

app.use(cors())
app.use(routes);

app.listen(3333, () => {
  console.log('server started on port 3333');
});
