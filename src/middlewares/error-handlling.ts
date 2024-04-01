import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/error.model";

const ErrorHandling = (error: ErrorModel, req: Request, res: Response, next: NextFunction) => {
    console.log("yyyyyyyyyyyyyyyyyyyy",error)
    if (!error.statusCode) error.statusCode = 500;
    if (!error.message) error.message = "Something went wrong";

    

    res.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message })

}

export default ErrorHandling;