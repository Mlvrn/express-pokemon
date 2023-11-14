import express from 'express';
import router from './routes/index.js';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/pokemon', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
