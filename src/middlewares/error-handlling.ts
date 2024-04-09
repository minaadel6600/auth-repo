import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/error.model";
import logger from "../utils/logger";

const ErrorHandling = (error: ErrorModel, req: Request, res: Response, next: NextFunction) => {

    let userId, msg, url;
    if (!error.statusCode) error.statusCode = 500;
    if (!error.message) error.message = "Something went wrong";

    userId = (req?.body?.user) ? req?.body?.user._id : "";
    msg = " (msg): " + error.message;
    url = "(url):" + req.url;

    logger.error(url + userId + msg)
    logger.error(error.stack)


    res.status(error.statusCode).json({ message: error.message })

}

export default ErrorHandling;