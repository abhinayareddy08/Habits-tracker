import { createDailyEntriesDto } from 'src/daily-entries/dto/create-daily-entries.dto';
import { updateDailyEntriesDto } from 'src/daily-entries/dto/update-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';

export abstract class DailyEntriesRepository {
  abstract create(
    data: createDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry>;
  abstract update(
    date: string,
    data: updateDailyEntriesDto,
    userId: number,
  ): Promise<DailyEntry>;
  abstract findByDateAndUserId(
    date: string,
    userId: number,
  ): Promise<DailyEntry | null>;
  abstract countByUserId(userId: number): Promise<number>;
}
