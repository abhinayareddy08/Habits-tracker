import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(data: createUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictException('Email already in use'); //409
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User Not Found Exception');
    }
    return user;
  }
}
