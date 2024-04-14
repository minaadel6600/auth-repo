import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IUser } from './../models/user.model';
import HttpError from '../models/error.model';
import { ACCESS_TOKEN_SECRET } from '../utils/constants';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import { UserRepository } from '../db-repositories/user.repo';


class UserService {
  public userRepository = new UserRepository();

  public async getAll() {

    const users = await this.userRepository.getAll()
    return users
  }

  public async getById(id:string) {

    const user = await this.userRepository.getById(id);
  
    return user;
  }

}

export default UserService;
