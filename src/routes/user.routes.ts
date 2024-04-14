import { Router } from "express";
import dataValidator from "../middlewares/validate-data.middleware";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";
import UsersController from "../controllers/user.controller"; 
import auth from "../middlewares/auth.middleware";
import UpdateUserDtoSchema from "../dtos/update-user.dto";

let usersController = new UsersController();
const router: Router = Router();

router.get('/',auth , AuthorizeRole([role.end_user]),usersController.getAllUsers);
router.get('/:id',usersController.getUserById);
router.put('/:id' ,dataValidator(UpdateUserDtoSchema), usersController.updateUser);
router.delete('/:id' , usersController.deleteUserById);


export const UsersRoutes: Router = router;
