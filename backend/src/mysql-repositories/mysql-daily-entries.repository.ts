import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDailyEntriesDto } from 'src/daily-entries/dto/create-daily-entries.dto';
import { updateDailyEntriesDto } from 'src/daily-entries/dto/update-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlDailyEntriesRepository implements DailyEntriesRepository {
  constructor(
    @InjectRepository(DailyEntry)
    private readonly repository: Repository<DailyEntry>,
  ) {}

  async create(
    data: createDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    const dailyEntry = this.repository.create({ ...data, userId });
    return this.repository.save(dailyEntry);
  }

  async update(
    date: string,
    data: updateDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry> {
    const updateEntry = await this.repository.findOne({
      where: { date, userId },
    });
    if (!updateEntry) {
      throw new NotFoundException('Entry not found');
    }
    Object.assign(updateEntry, data);

    return this.repository.save(updateEntry);
  }

  async findByDateAndUserId(
    date: string,
    userId: number,
  ): Promise<DailyEntry | null> {
    return await this.repository.findOne({ where: { date, userId } });
  }
}
