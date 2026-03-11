import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/achievements.entity';
import { AchievementsController } from './controller/achievements.controller';
import { AchievementsService } from './service/achievements.service';
import { AchievementsRepository } from 'src/repositories/achievements.repository';
import { MysqlAchievementsRepository } from 'src/mysql-repositories/mysql-achievements.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementsController],
  providers: [
    AchievementsService,
    { provide: AchievementsRepository, useClass: MysqlAchievementsRepository },
  ],
  exports: [AchievementsService],
})
export class AchievementsModule {}
