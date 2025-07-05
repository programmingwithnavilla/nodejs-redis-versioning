import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from './user.controller';

const router = Router();

const userController = container.resolve(UserController);

router.get('/', userController.getAll);
// router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
