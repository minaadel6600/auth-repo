import { Router } from "express";
import AuthenticationController from "../controllers/authentication.controller";

let authController = new AuthenticationController();
const router: Router = Router();

router.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

router.post('/register', authController.registration);

export const UsersRoutes: Router = router;
