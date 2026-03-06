import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { loginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(data: loginUserDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User');
    }
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
