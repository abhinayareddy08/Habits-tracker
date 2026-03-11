import { ConflictException, Injectable } from '@nestjs/common';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { createHabitLogDto } from '../dto/create-habit-log.dto';
import { GamificationService } from 'src/gamification/service/gamification.service';
import { AchievementsService } from 'src/achievements/service/achievements.service';

@Injectable()
export class HabitLogService {
  constructor(
    private readonly habitLogRepository: HabitLogRepository,
    private readonly gamificationService: GamificationService,
    private readonly achievementsService: AchievementsService,
  ) {}

  async create(data: createHabitLogDto, userId: number) {
    const existing = await this.habitLogRepository.findByHabitIdAndDate(
      data.habitId,
      data.date,
    );
    if (existing) {
      throw new ConflictException('Habit already logged for this date!');
    }
    const log = await this.habitLogRepository.create(data, userId);
    await this.gamificationService.rewardXP(userId, 10);

    const totalHabits = await this.habitLogRepository.countByUserId(userId);
    const HABIT_MILESTONES = [
      1, 5, 10, 25, 50, 75, 100, 200, 350, 500, 750, 1000,
    ];
    if (HABIT_MILESTONES.includes(totalHabits)) {
      await this.achievementsService.unlock(userId, `Habit_${totalHabits}`);
    }
    return log;
  }

  async findByUserAndDate(userId: number, date: string) {
    return await this.habitLogRepository.findByUserAndDate(userId, date);
  }

  async delete(data: createHabitLogDto, userId: number) {
    return await this.habitLogRepository.delete(data, userId);
  }
}
