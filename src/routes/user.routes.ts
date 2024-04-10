import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import CreateUserDtoSchema  from '../dtos/create-user.dto'
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";
import Authorize from "../middlewares/role-authorize";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";
import UsersController from "../controllers/user.controller"; 
import auth from "../middlewares/auth.middleware";

let usersController = new UsersController();
const router: Router = Router();

router.get('/',auth , AuthorizeRole([role.end_user]),usersController.getAllUsers);
router.get('/:id',dataValidator(LoginDtoSchema), usersController.getAllUsers);


export const UsersRoutes: Router = router;
