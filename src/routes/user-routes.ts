import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import CreateUserDtoSchema  from '../dtos/create-user.dto'
import dataValidator from "../middlewares/validate-data.middleware";
import LoginDtoSchema from "../dtos/login.dto";

let authController = new AuthenticationController();
const router: Router = Router();

router.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

router.post('/register',dataValidator(CreateUserDtoSchema), authController.registration);
router.post('/login',dataValidator(LoginDtoSchema), authController.logIn);

export const UsersRoutes: Router = router;
