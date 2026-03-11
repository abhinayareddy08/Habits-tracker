import { GamificationService } from './service/gamification.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementsModule } from 'src/achievements/achievements.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AchievementsModule],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
