import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: Partial<User>) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('手机号已存在');
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
} 