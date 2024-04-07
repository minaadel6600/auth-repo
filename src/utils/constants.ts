import * as dotenv from "dotenv";
import * as _ from 'lodash';
import * as path from "path";

dotenv.config({path: ".env"});

const port = process.env.APP_PORT || '3000';
const dbPort = process.env.APP_PORT || '27017';
export const ENVIRONMENT    = _.defaultTo(process.env.APP_ENV, "dev");
export const IS_PRODUCTION  = ENVIRONMENT === "production";
export const APP_PORT       = _.defaultTo(parseInt(port), 3000);
export const DB_URL      =  _.defaultTo(process.env.DB_URL, "mongodb://localhost");
export const DB_PORT       = _.defaultTo(parseInt(dbPort), 27017);
export const DB_NAME       = _.defaultTo(process.env.DB_NAME, "testDB");
export const ACCESS_TOKEN_SECRET     = _.defaultTo(process.env.ACCESS_TOKEN_SECRET, "access_secret");
export const REFRESH_TOKEN_SECRET     = _.defaultTo(process.env.REFRESH_TOKEN_SECRET, "refresh_secret");
export const LOG_DIRECTORY  = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));
