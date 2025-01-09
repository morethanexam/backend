import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 创建用户
  async create(data: Partial<User>): Promise<User> {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (err) {
      // 如果是重复手机号，则抛出 409 错误
      if (err.code === '23505') { // postgres中 unique冲突 often是23505
        throw new ConflictException('手机号已存在');
      }
      throw err;
    }
  }

  // 查询所有用户
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 根据ID查询用户
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 更新用户
  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  // 删除用户
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
} 