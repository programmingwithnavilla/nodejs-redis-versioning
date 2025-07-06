import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from './user.controller';
import { zodValidate } from '../../shared/zod-validate';
import { CreateUserSchema, UpdateUserSchema } from './user.schema';

const router = Router();

const userController = container.resolve(UserController);

router.get('/', userController.getAll);
router.post('/', zodValidate(CreateUserSchema), userController.create);
router.put('/:id', zodValidate(UpdateUserSchema), userController.update);
router.delete('/:id', userController.delete);

export default router;
