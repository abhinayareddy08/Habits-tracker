import { Body, Controller, Post, ParseIntPipe, Param, Get } from '@nestjs/common';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDto } from 'src/users/dto/login-user.dto';
import { UserService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Post('login')
  async login(@Body() body: loginUserDto) {
    return this.userService.login(body);
  }

  @Get(':id')
  async findByid(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}
