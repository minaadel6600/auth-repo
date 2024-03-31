import { Router } from "express";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send("What's up doc ?!");
});

router.get('/:id', (req, res) => {
    res.send("What's up : "+ req.params.id);
});

export const UsersRoutes: Router = router;