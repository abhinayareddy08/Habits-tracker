import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLog } from 'src/entities/habits-logs.entity';
import { HabitLogController } from './controller/habit-log.controller';
import { HabitLogService } from './service/habit-log.service';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { MysqlHabitLogRepository } from 'src/mysql-repositories/mysql-habit-log.repository';
import { GamificationModule } from 'src/gamification/gamification.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog]), GamificationModule,AchievementsModule],
  controllers: [HabitLogController],
  providers: [
    HabitLogService,
    { provide: HabitLogRepository, useClass: MysqlHabitLogRepository },
  ],
  exports: [HabitLogService],
})
export class HabitLogModule {}
