import { Response, NextFunction } from "express";
import { resSuccess } from "../utils/response.helper";
import UserService from "../services/user.service";
import IRequest from "../interfaces/i-request";
import { getTranslatedMessage } from "../utils/locales/translate-helpers";

class UsersController {
  private userService = new UserService();

  public getAllUsers = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.body;
    try {
      const users = await this.userService.getAll();
      resSuccess(req, res, 200, "", { users });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = (req: IRequest, res: Response, next: NextFunction) => {
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
