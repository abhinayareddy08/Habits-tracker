import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersController } from './controller/users/users.controller';
import { UserService } from './service/users/users.service';
import { UserRepository } from 'src/repositories/user.repository';
import { MysqlUserRepository } from 'src/mysql-repositories/mysql-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UsersController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: MysqlUserRepository },
  ],
  exports: [UserService],
})
export class UsersModule {}
