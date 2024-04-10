import { Router } from 'express';

import { UsersRoutes } from './user-routes';
import AuthorizeRole from '../middlewares/role-authorize';
import { role } from '../models/user.model';

const router: Router = Router();                            

router.use('/users',AuthorizeRole([]), UsersRoutes); 

export const MainRouter: Router = router; 