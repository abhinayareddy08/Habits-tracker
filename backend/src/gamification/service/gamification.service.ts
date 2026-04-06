import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementsService } from 'src/achievements/service/achievements.service';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly achievementsService: AchievementsService,
    private readonly habitLogRepository: HabitLogRepository,
  ) {}

  async rewardXP(userId: number, xp: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id: userId } });
    const LEVEL_MILESTONES = [2, 5, 10, 15, 20, 30, 50, 75, 100];
    if (user) {
      user.xp += xp;
      if (user.xp >= user.level * 1000) {
        user.level += 1;
        if (LEVEL_MILESTONES.includes(user.level)) {
          await this.achievementsService.unlock(userId, `LEVEL_${user.level}`);
        }
      }
      return await this.repository.save(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async updateStreak(userId: number): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const dates = await this.habitLogRepository.findDistinctDatesByUserId(userId);
    const { currentStreak, longestStreak } = this.calculateStreak(dates);

    user.currentStreak = currentStreak;
    user.longestStreak = Math.max(longestStreak, user.longestStreak);
    await this.repository.save(user);

    // Unlock streak milestone badges
    const STREAK_MILESTONES = [3, 7, 14, 21, 30, 60, 90, 180, 365];
    if (STREAK_MILESTONES.includes(currentStreak)) {
      await this.achievementsService.unlock(userId, `STREAK_${currentStreak}`);
    }
  }

  private calculateStreak(dates: string[]): { currentStreak: number; longestStreak: number } {
    if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Streak must start from today or yesterday (allow logging before midnight)
    if (dates[0] !== today && dates[0] !== yesterday) {
      return { currentStreak: 0, longestStreak: this.getLongestRun(dates) };
    }

    let currentStreak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diffDays = (prev.getTime() - curr.getTime()) / 86400000;

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }

    return { currentStreak, longestStreak: this.getLongestRun(dates) };
  }

  private getLongestRun(dates: string[]): number {
    if (dates.length === 0) return 0;
    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diffDays = (prev.getTime() - curr.getTime()) / 86400000;

      if (diffDays === 1) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 1;
      }
    }
    return longest;
  }
}
