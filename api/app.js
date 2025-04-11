// api/app.js
import express from 'express';
import routes from './routes';

app.use('/api', routes);

const app = express();
app.use(express.json());
app.use('/api', routes);
export default app;
