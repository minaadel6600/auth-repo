import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel, { IUser } from './../models/user.model';
import HttpError from '../models/error.model';
import { GenericRepository } from './userRepo'; 
import { ACCESS_TOKEN_SECRET } from '../utils/constants';
import { getTranslatedMessage } from '../utils/translate';


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

  public async register(req:any,userData: IUser) {
    if (
      await this.db.findOne({ email: userData.email })
    ) {
      throw new HttpError(400, getTranslatedMessage(req,'EMAIL_ALREADY_REGISTERED')+ ' ' + userData.email);
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

  public async login(loginData: { email: string, password: string }) {

    const user = await this.db.findOne({ email: loginData.email });
    if (!user)throw new HttpError(404, "EmailOrPasswordInvalid");

    const isPasswordMatching = await bcrypt.compare(
      loginData.password,
      user.get('password', null, { getters: false }),
    );

    if (!isPasswordMatching)throw new HttpError(404, "EmailOrPasswordInvalid");

    return user;
  }
  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: IUser): ITokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = ACCESS_TOKEN_SECRET;
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
