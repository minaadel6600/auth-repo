import { Response, NextFunction } from "express";
import { resSuccess } from "../utils/response.helper";
import UserService from "../services/user.service";
import IRequest from "../interfaces/i-request";

class UsersController {
  private userService = new UserService();

  public getAllUsers = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getAllUsersService();
      resSuccess(req, res, 200, "", { users });
    } catch (error) {
      next(error);
    }
  };
  public getUserById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const user= await this.userService.getUserByIdService(userId);
      resSuccess(req, res, 200, "", { user });
    } catch (error) {
      next(error);
    }
  };
  public deleteUserById = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const user= await this.userService.deleteUserByIdService(userId);
      resSuccess(req, res, 200, "", { user });
    } catch (error) {
      next(error);
    }
  };
  public updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await this.userService.updateUserService(userId, userData);
      
      resSuccess(req, res, 200, "user updated successfully", { updatedUser });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
