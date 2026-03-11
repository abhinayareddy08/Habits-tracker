import { Injectable } from '@nestjs/common';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { createDailyEntriesDto } from '../dto/create-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { updateDailyEntriesDto } from '../dto/update-daily-entries.dto';
import { GamificationService } from 'src/gamification/service/gamification.service';
import { AchievementsService } from 'src/achievements/service/achievements.service';
import { use } from 'passport';

@Injectable()
export class DailyEntriesService {
  constructor(
    private readonly dailyEntriesRepository: DailyEntriesRepository,
    private readonly gamificationService: GamificationService,
    private readonly achievementsService: AchievementsService,
  ) {}
  async create(
    data: createDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    //Xp Awarding
    const dailyEntry = await this.dailyEntriesRepository.create(data, userId);
    if (data.journalText) {
      await this.gamificationService.rewardXP(userId, 35);
    }
    if (data.mood) {
      await this.gamificationService.rewardXP(userId, 5);
    }
    //Achievements
    const totalEntries =
      await this.dailyEntriesRepository.countByUserId(userId);
    const JOURNAL_MILESTONES = [1, 5, 10, 25, 50, 75, 100, 150, 200, 350, 500];
    if (JOURNAL_MILESTONES.includes(totalEntries)) {
      await this.achievementsService.unlock(
        userId,
        `JOURNAL_ENTRY_${totalEntries}`,
      );
    }
    return dailyEntry;
  }

  async update(
    date: string,
    data: updateDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    const exsisting = await this.dailyEntriesRepository.findByDateAndUserId(
      date,
      userId,
    );
    if (exsisting) {
      if (data.mood && !exsisting.mood) {
        await this.gamificationService.rewardXP(userId, 5);
      }
      if (data.journalText && !exsisting.journalText) {
        await this.gamificationService.rewardXP(userId, 35);
        //Achievements
        const totalEntries =
          await this.dailyEntriesRepository.countByUserId(userId);
        const JOURNAL_MILESTONES = [
          1, 5, 10, 25, 50, 75, 100, 150, 200, 350, 500,
        ];
        if (JOURNAL_MILESTONES.includes(totalEntries)) {
          await this.achievementsService.unlock(
            userId,
            `JOURNAL_ENTRY_${totalEntries}`,
          );
        }
      }
    }

    return this.dailyEntriesRepository.update(date, data, userId);
  }

  async findByDateAndUserId(
    date: string,
    userId: number,
  ): Promise<DailyEntry | null> {
    return this.dailyEntriesRepository.findByDateAndUserId(date, userId);
  }
}
