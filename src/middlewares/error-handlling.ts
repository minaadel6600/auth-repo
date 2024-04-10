import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/error.model";
import logger from "../utils/logger";
import IRequest from "../interfaces/i-request";

const ErrorHandling = (error: ErrorModel, req: IRequest, res: Response, next: NextFunction) => {

    let userId, msg, url;
    if (!error.statusCode) error.statusCode = 500;
    if (!error.message) error.message = "Something went wrong";

    userId = (req?.user) ? req?.user._id : "";
    msg = " (msg): " + error.message;
    url = "(url):" + req.url;

    logger.error(url + userId + msg)
    logger.error(error.stack)


    res.status(error.statusCode).json({ message: error.message })

}

export default ErrorHandling;