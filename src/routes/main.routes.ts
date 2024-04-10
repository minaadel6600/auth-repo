import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { bookRoutes } from './book.routes';
import { UsersRoutes } from './user.routes';

const router: Router = Router();                            

router.use('/users', UsersRoutes); 
router.use('/auth', AuthRoutes); 
router.use('/books', bookRoutes); 

export const MainRouter: Router = router; 