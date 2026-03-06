import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from 'src/repositories/user.repository';
import { MysqlUserRepository } from 'src/mysql-repositories/mysql-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET!,
        signOptions: { expiresIn: process.env.JWT_TOKEN_LIFETIME as any },
      }),
    }),
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: MysqlUserRepository,
    },
  ],
})
export class AuthModule {}
