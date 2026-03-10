import { HabitLog } from 'src/entities/habits-logs.entity';
import { createHabitLogDto } from 'src/habit-log/dto/create-habit-log.dto';

export abstract class HabitLogRepository {
  abstract create(data: createHabitLogDto, userId: number): Promise<HabitLog>;
  abstract findByUserAndDate(userId: number, date: string): Promise<HabitLog[]>;
  abstract delete(data: createHabitLogDto, userId: number): Promise<void>;
}
