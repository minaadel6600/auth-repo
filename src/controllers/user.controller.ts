
import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from '../utils/jwt/helpers/access-token.helper';
import { generateRefreshToken } from '../utils/jwt/helpers/refresh-token.helper';
import { resSuccess } from '../utils/response.helper';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import UserService from '../services/user.service';
import IRequest from '../interfaces/i-request';

class UsersController {

  private userService = new UserService();

  public getAllUsers = async (req: IRequest, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      const users = await this.userService.getAll();
        resSuccess(req,res,200,'',{users})
    } catch (error) {
      next(error);
    }
  }


  // public logIn = async (req: any, res: Response, next: NextFunction) => {

  //   try {
  //     const logInData = req.body;
  //     const user = await this.authenticationService.login(logInData);
  //     const JWTPayload = { id: user._id,role: user.role };
  //     const accessToken = generateAccessToken(JWTPayload, '5h');
  //     const refreshToken = generateRefreshToken(JWTPayload, '5d');

  //     const message = getTranslatedMessage(req, 'USER_LOGGED_SUCCESS');
  //     return resSuccess(req, res, 200, message, { accessToken, refreshToken });

  //   } catch (error) {
  //     next(error);
  //   }

  // }

  // private loggingOut = (request: Request, response: Response) => {
  //   response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
  //   response.send(200);
  // }

  // private createCookie(tokenData: TokenData) {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  // }

  // private createToken(user: User): TokenData {
  //   const expiresIn = 60 * 60; // an hour
  //   const secret = process.env.JWT_SECRET;
  //   const dataStoredInToken: DataStoredInToken = {
  //     _id: user._id,
  //   };
  //   return {
  //     expiresIn,
  //     token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  //   };
  // }

}

export default UsersController;
