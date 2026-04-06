import { GamificationService } from './service/gamification.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { User } from 'src/entities/user.entity';
import { HabitLog } from 'src/entities/habits-logs.entity';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { MysqlHabitLogRepository } from 'src/mysql-repositories/mysql-habit-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, HabitLog]), AchievementsModule],
  providers: [
    GamificationService,
    { provide: HabitLogRepository, useClass: MysqlHabitLogRepository },
  ],
  exports: [GamificationService],
})
export class GamificationModule {}
