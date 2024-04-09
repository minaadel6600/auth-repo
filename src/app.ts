import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/main-routes';
// import { loadErrorHandlers } from './utilities/error-handling';
// import session from 'express-session';
import helmet from "helmet";
import ErrorHandling from './middlewares/error-handlling';
import mongoose from 'mongoose';
import { DB_NAME, DB_PORT, DB_URL } from './utils/constants';
import Logger from './utils/logger';
// import compression from "compression";
// import { SESSION_SECRET } from "./utils/secrets";
// import './database'; // initialize database
// import './utilities/passport'


const app: Application = express();

const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
mongoose.connect(`${DB_URL}:${DB_PORT}/${DB_NAME}`).then(() => {
  console.log("db is connected ...");
});



app.use(helmet());
// app.use(compression());
app.use(bodyParser.json());
// app.use(session({
//     secret: SESSION_SECRET,
//     cookie: {
//       maxAge: 60000
//     },
//     resave           : false,
//     saveUninitialized: false
//   }
// ));
 

app.use('/', MainRouter);

app.use(ErrorHandling)


export default app;
