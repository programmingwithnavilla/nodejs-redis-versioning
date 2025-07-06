import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from './user.controller';
import { validateParams, zodValidate } from '../../shared/zod-validate';
import {
  CreateUserSchema,
  ParamsIdSchema,
  UpdateUserSchema,
} from './user.schema';

const router = Router();

const userController = container.resolve(UserController);

router.get('/', userController.getAll);
router.post('/', zodValidate(CreateUserSchema), userController.create);
router.put(
  '/:id',
  validateParams(ParamsIdSchema),
  zodValidate(UpdateUserSchema),
  userController.update,
);
router.delete('/:id', validateParams(ParamsIdSchema), userController.delete);

export default router;
//
