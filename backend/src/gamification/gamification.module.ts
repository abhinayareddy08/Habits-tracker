import { GamificationService } from './service/gamification.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
