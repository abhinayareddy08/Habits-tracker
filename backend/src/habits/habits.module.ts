import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from 'src/entities/habits.entity';
import { HabitsController } from './controller/habits.controller';
import { Module } from '@nestjs/common';
import { HabitService } from './service/habits.service';
import { MysqHabitRepository } from 'src/mysql-repositories/mysql-habit.repository';
import { HabitRepository } from 'src/repositories/habit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Habit])],
  controllers: [HabitsController],
  providers: [
    HabitService,
    { provide: HabitRepository, useClass: MysqHabitRepository },
  ],
  exports: [HabitService],
})
export class HabitModule {}
