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

class AuthenticationController  { 

  public authenticationService = new AuthenticationService();
  //private user = userModel;

  constructor() {
   
  }
 

  registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    console.log(userData)
    try {
      const {
        cookie,
        user,
      } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  }


  // private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
  //   const logInData: LogInDto = request.body;
  //   const user = await this.user.findOne({ email: logInData.email });
  //   if (user) {
  //     const isPasswordMatching = await bcrypt.compare(
  //       logInData.password,
  //       user.get('password', null, { getters: false }),
  //     );
  //     if (isPasswordMatching) {
  //       const tokenData = this.createToken(user);
  //       response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
  //       response.send(user);
  //     } else {
  //       next(new WrongCredentialsException());
  //     }
  //   } else {
  //     next(new WrongCredentialsException());
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

export default AuthenticationController;
