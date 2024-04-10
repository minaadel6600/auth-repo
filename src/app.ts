import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/main-routes';
import helmet from "helmet";
import ErrorHandling from './middlewares/error-handlling';
import mongoose from 'mongoose';
import { DB_NAME, DB_PORT, DB_URL } from './utils/constants';


const app: Application = express();

mongoose.connect(`${DB_URL}:${DB_PORT}/${DB_NAME}`).then(() => {
  console.log("db is connected ...");
});

app.use(helmet());
app.use(bodyParser.json());
app.use('/', MainRouter);
app.use(ErrorHandling)


export default app;
