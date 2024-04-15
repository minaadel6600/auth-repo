import HttpError from '../models/error.model';
import { UserRepository } from '../db-repositories/user.repo';
import { IUser } from '../models/user.model';


class UserService {
  public userRepository = new UserRepository();

  public async getAllUsersService() {

    const users = await this.userRepository.getAll()

    const usersWithoutPassword = users.map(u=>{ u.password = undefined;return u;})

    return usersWithoutPassword
  }

  public async getUserByIdService(id:string) {
    const user = await this.userRepository.getById(id);
    user.password = undefined;
    if(!user) throw new HttpError(404,'user not found');
    return user;
  }
  public async deleteUserByIdService(id:string) {
    const user = await this.userRepository.DeleteById(id);
    if(!user) throw new HttpError(404,'user not found');
    return user;
  }
  public async updateUserService(userId:string,data:any) {

    const user = await this.userRepository.getById(userId);
    if(!user) throw new HttpError(404,'user not found');
    let updatedUser = await this.userRepository.UpdateById(userId,data)
    updatedUser.password = undefined;
    return updatedUser;
  }
}

export default UserService;
