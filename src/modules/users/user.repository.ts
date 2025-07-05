import prisma from '../../config/prisma';
import { CreateUserDto, UpdateUserDto } from './user.dto';
export const UserRepository = {
  create: (data: CreateUserDto) => prisma.user.create({ data }),
  findAll: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  update: (id: number, data: UpdateUserDto) =>
    prisma.user.update({ where: { id }, data }),
  delete: (id: number) => prisma.user.delete({ where: { id } }),
};
