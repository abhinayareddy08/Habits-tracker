import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { DailyEntriesController } from './controller/daily-entries.controller';
import { DailyEntriesService } from './service/daily-entries.service';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { MysqlDailyEntriesRepository } from 'src/mysql-repositories/mysql-daily-entries.repository';
import { GamificationModule } from 'src/gamification/gamification.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyEntry]),
    GamificationModule,
    AchievementsModule,
  ],
  controllers: [DailyEntriesController],
  providers: [
    DailyEntriesService,
    { provide: DailyEntriesRepository, useClass: MysqlDailyEntriesRepository },
  ],
  exports: [DailyEntriesService],
})
export class DailyEntriesModule {}
