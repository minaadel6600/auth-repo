import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller"; 
import CreateUserDtoSchema  from '../dtos/create-user.dto'
import dataValidator from "../middlewares/validate-data.middleware";

let authController = new AuthenticationController();
const router: Router = Router();

router.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

router.post('/register',dataValidator(CreateUserDtoSchema), authController.registration);

export const UsersRoutes: Router = router;
