import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel, { IUser } from './../models/user.model';
import HttpError from '../models/error.model';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../utils/constants';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import { UserRepository } from '../db-repositories/user.repo';
import { generateRefreshToken } from '../utils/jwt/helpers/refresh-token.helper';


export interface ICookieData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  _id: string;
}

class AuthenticationService {
  private userRepository = new UserRepository(); 

  public async registerService(req: any, userData: IUser) {
    if (
      await this.userRepository.getOne({ email: userData.email })
    ) {
      throw new HttpError(400, getTranslatedMessage(req, 'EMAIL_ALREADY_REGISTERED') + ' ' + userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    let user = await this.userRepository.Create(userData);
   // const tokenData = this.createToken(user);
   // const cookie = this.createCookie(tokenData);
    return {
    //  cookie,
      user,
    };
  }

  public async loginService(loginData: { email: string, password: string }) {


    const user: IUser = await this.userRepository.getOne({ email: loginData.email });

    if (!user) throw new HttpError(404, "EmailOrPasswordInvalid");


    const isPasswordMatching = await bcrypt.compare(
      loginData.password,
      user.password
    );
    //const tokenData = generateRefreshToken(user);
   // const cookie = this.createCookie(tokenData);


    if (!isPasswordMatching) throw new HttpError(404, "EmailOrPasswordInvalid");

    return user;
  }

  public async verifyRefreshTokenService(token: string) {

    let decodedPayload:any = await jwt.verify(token, REFRESH_TOKEN_SECRET);
    if(!decodedPayload) throw new HttpError(500,'invalid refresh token')
    let user = await this.userRepository.getById(decodedPayload.id);
    if(!user) throw new HttpError(500,'invalid refresh token')
 
    return user;
  }
  public createCookie(token: string , timeInDays:number) {
    let tokenData: ICookieData = { token: token, expiresIn: timeInDays * 60 * 60 * 24 } // 5 days

    return `Refresh-Token=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  // public createToken(user: IUser): ITokenData {
  //   const expiresIn = 60 * 60; // an hour
  //   const secret = ACCESS_TOKEN_SECRET;
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
