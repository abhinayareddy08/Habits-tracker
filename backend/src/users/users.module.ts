import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersController } from './controller/users/users.controller';
import { UserService } from './service/users/users.service';
import { UserRepository } from 'src/repositories/user.repository';
import { MysqlUserRepository } from 'src/mysql-repositories/mysql-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLog } from 'src/entities/habits-logs.entity';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { MysqlHabitLogRepository } from 'src/mysql-repositories/mysql-habit-log.repository';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { MysqlDailyEntriesRepository } from 'src/mysql-repositories/mysql-daily-entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, HabitLog, DailyEntry])],
  controllers: [UsersController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: MysqlUserRepository },
    { provide: HabitLogRepository, useClass: MysqlHabitLogRepository },
    { provide: DailyEntriesRepository, useClass: MysqlDailyEntriesRepository },
  ],
  exports: [UserService],
})
export class UsersModule {}
