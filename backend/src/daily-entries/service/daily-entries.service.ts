import { Injectable } from '@nestjs/common';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { createDailyEntriesDto } from '../dto/create-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { updateDailyEntriesDto } from '../dto/update-daily-entries.dto';

@Injectable()
export class DailyEntriesService {
  constructor(
    private readonly dailyEntriesRepository: DailyEntriesRepository,
  ) {}
  async create(
    data: createDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    return this.dailyEntriesRepository.create(data, userId);
  }

  async update(
    date: string,
    data: updateDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    return this.dailyEntriesRepository.update(date, data, userId);
  }

  async findByDateAndUserId(
    date: string,
    userId: number,
  ): Promise<DailyEntry | null> {
    return this.dailyEntriesRepository.findByDateAndUserId(date, userId);
  }
}
