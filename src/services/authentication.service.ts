// import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
// import DataStoredInToken from '../interfaces/dataStoredInToken';
// import TokenData from '../interfaces/tokenData.interface';
// import CreateUserDto from '../user/user.dto';
// import User from '../user/user.interface';
import userModel from './../models/user.model';
import CreateUserDto from '../dtos/create-user.dto';
import { NextFunction } from 'express';
import ErrorModel from '../models/error.model';

class AuthenticationService {
  public user = userModel;

  public async register(userData: CreateUserDto,next:NextFunction) {
    // if (
    //   await this.user.findOne({ email: userData.email })
    // ) {

    try {
        throw new Error("toto");
    } catch (error:any) {
     
      let tt : ErrorModel = new ErrorModel();
      tt.message = error.message;
      tt.statusCode = 400;
      console.log("errorerrorerrorerrorerror",tt)
      next(tt)
    }
    
    // }
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // const user = await this.user.create({
    //   ...userData,
    //   password: hashedPassword,
    // });
    // const tokenData = this.createToken(user);
    // const cookie = this.createCookie(tokenData);
    // return {
    //   cookie,
    //   user,
    // };
  }
  // public createCookie(tokenData: TokenData) {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  // }
  // public createToken(user: User): TokenData {
  //   const expiresIn = 60 * 60; // an hour
  //   const secret = process.env.JWT_SECRET || "secret";
  //   const dataStoredInToken: DataStoredInToken = {
  //     _id: user._id,
  //   };
  //   return {
  //     expiresIn,
  //     token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  //   };
  // }
}

export default AuthenticationService;
