import { Injectable } from '@nestjs/common';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { createDailyEntriesDto } from '../dto/create-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { updateDailyEntriesDto } from '../dto/update-daily-entries.dto';
import { GamificationService } from 'src/gamification/service/gamification.service';

@Injectable()
export class DailyEntriesService {
  constructor(
    private readonly dailyEntriesRepository: DailyEntriesRepository,
    private readonly gamificationService: GamificationService,
  ) {}
  async create(
    data: createDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    const dailyEntry = await this.dailyEntriesRepository.create(data, userId);
    if (data.journalText) {
      await this.gamificationService.rewardXP(userId, 35);
    }
    if (data.mood) {
      await this.gamificationService.rewardXP(userId, 5);
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
