import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";
import { role } from "../models/user.model";
import AuthorizeRole from "../middlewares/role-authorize";

let authController = new AuthenticationController();
const router: Router = Router();

router.get('/',AuthorizeRole([role.admin]), authController.registration);
router.get('/:id',AuthorizeRole([role.admin,role["end-user"],role.agent]), authController.registration);
router.post('/',AuthorizeRole([role.admin,role.agent]), authController.registration);
router.post('/login',dataValidator(LoginDtoSchema), authController.logIn);


export const bookRoutes: Router = router;
