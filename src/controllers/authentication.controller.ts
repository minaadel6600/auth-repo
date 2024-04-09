// import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import WrongCredentialsException from '../exceptions/WrongCredentialsException';
// import Controller from '../interfaces/controller.interface';
// import DataStoredInToken from '../interfaces/dataStoredInToken';
// import TokenData from '../interfaces/tokenData.interface';
// import validationMiddleware from '../middleware/validation.middleware';
// import CreateUserDto from '../user/user.dto';
// import User from '../user/user.interface';
// import userModel from './../user/user.model';
import AuthenticationService from '../services/authentication.service';
import LogInDto from '../dtos/login.dto';
import CreateUserDtoSchema from '../dtos/create-user.dto';
import LoginDtoSchema from '../dtos/login.dto';
import { generateAccessToken } from '../utils/jwt/helpers/access-token.helper';
import { generateRefreshToken } from '../utils/jwt/helpers/refresh-token.helper';
import { resSuccess } from '../utils/response.helper'; 
import { getTranslatedMessage } from '../utils/translate';

class AuthenticationController {

  public authenticationService = new AuthenticationService();
  //private user = userModel;

  constructor() {

  }


  public registration = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    console.log(userData)
    try {
      const {
        cookie,
        user,
      } = await this.authenticationService.register(req,userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.send({ user });
    } catch (error) {
      next(error);
    }
  }


  public logIn = async (req: any, res: Response, next: NextFunction) => {

    try {
      const logInData = req.body;
      const user = await this.authenticationService.login(logInData);
      const JWTPayload = { id: user._id, email: user.email, role: user.role };
      const accessToken = generateAccessToken(JWTPayload, '5h');
      const refreshToken = generateRefreshToken(JWTPayload, '5d');

      const message = getTranslatedMessage(req,'USER_LOGGED_SUCCESS');
      return resSuccess(req,res, 200, message, { accessToken, refreshToken });

    } catch (error) {
      next(error);
    }

  }

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

export default AuthenticationController;
