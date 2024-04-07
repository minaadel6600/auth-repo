import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
// import DataStoredInToken from '../interfaces/dataStoredInToken';
// import CreateUserDto from '../user/user.dto';
// import User from '../user/user.interface';
import userModel, { IUser } from './../models/user.model';
import CreateUserDto from '../dtos/create-user.dto';
import { NextFunction } from 'express';
import HttpError from '../models/error.model';
import { GenericRepository } from './userRepo';


interface ITokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  _id: string;
}

class AuthenticationService {
//  public user = userModel;
  public db = new GenericRepository<IUser>(userModel);

  public async register(userData: IUser) {
    if (
      await this.db.findOne({ email: userData.email })
    ) {
      throw new HttpError(400, "UserWithThatEmailAlreadyExistsException " + userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    let user = await this.db.Create(userData);
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET || "secret";
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
