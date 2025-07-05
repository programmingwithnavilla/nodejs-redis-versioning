import redis from '../../config/redis';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { injectable } from 'tsyringe';

@injectable()
export class UserService {
  async create(dto: CreateUserDto) {
    const user = await UserRepository.create(dto);
    await redis.incr('users:version');
    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const version = (await redis.get('users:version')) || '1';
    const cacheKey = `users-v${version}`;

    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const users = await UserRepository.findAll();
    await redis.set(cacheKey, JSON.stringify(users), 'EX', 3600);
    return users.map((user: Partial<UserEntity>) => new UserEntity(user));
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const version = (await redis.get(`user:${id}:version`)) || '1';
    const cacheKey = `user:${id}-v${version}`;

    const cached = await redis.get(cacheKey);
    if (cached) return new UserEntity(JSON.parse(cached));

    const user = await UserRepository.findById(id);
    if (!user) return null;

    await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
    return new UserEntity(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const updated = await UserRepository.update(id, dto);
    await redis.incr('users:version');
    await redis.incr(`user:${id}:version`);
    return new UserEntity(updated);
  }

  async delete(id: number) {
    await UserRepository.delete(id);
    await redis.incr('users:version');
    await redis.incr(`user:${id}:version`);
  }
}
