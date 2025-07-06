import { Request, Response } from 'express';
import { UserService } from './user.service';
import { injectable, inject } from 'tsyringe';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  getAll = async (_: Request, res: Response) => {
    const users = await this.userService.findAll();
    res.json(users);
  };

  getById = async (req: Request, res: Response) => {
    const user = await this.userService.findOne(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const dto: CreateUserDto = req.body;
    const user = await this.userService.create(dto);
    res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const dto: UpdateUserDto = req.body;
    const user = await this.userService.update(Number(req.params.id), dto);
    res.json(user);
  };

  delete = async (req: Request, res: Response) => {
    await this.userService.delete(Number(req.params.id));
    res.status(204).send();
  };
}
