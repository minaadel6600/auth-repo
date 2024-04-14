import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IUser } from './../models/user.model';
import HttpError from '../models/error.model';
import { ACCESS_TOKEN_SECRET } from '../utils/constants';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';
import { UserRepository } from '../db-repositories/user.repo';


class UserService {
  public userRepository = new UserRepository();

  public async getAllUsersService() {

    const users = await this.userRepository.getAll()
    return users
  }

  public async getUserByIdService(id:string) {
    const user = await this.userRepository.getById(id);
    if(!user) throw new HttpError(404,'user not found');
    return user;
  }
  public async updateUserService(userId:string,data:any) {

    const user = await this.userRepository.getById(userId);
    if(!user) throw new HttpError(404,'user not found');
    const updatedUser = await this.userRepository.UpdateById(userId,data)
    return updatedUser;
  }
}

export default UserService;
