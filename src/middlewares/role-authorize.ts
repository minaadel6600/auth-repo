import { NextFunction, Request, Response } from "express";
import HttpError from "../models/error.model";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";
import { role } from "../models/user.model";

const AuthorizeRole = (allowedRoles: any) => {

    return async (req: Request, res:Response, next: NextFunction) => {

      try {
        const userRoles:[role] = [role.agent];

        // if not at least one role exist in allowed roles then break the process
        if (!userRoles.some((r) => allowedRoles.includes(r))) {
            throw new HttpError(401, 
                getTranslatedMessage(req, 'USER_UNAUTHORIZED') 
            );
        }
        next();
      } catch (error) {
        next(error)
      }


    }

};
 


export default AuthorizeRole;