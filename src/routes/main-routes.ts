import { Router } from 'express';
import { UsersRoutes } from './user-routes';
import { bookRoutes } from './book-routes';

const router: Router = Router();                            

router.use('/users', UsersRoutes); 
router.use('/books', bookRoutes); 

export const MainRouter: Router = router; 