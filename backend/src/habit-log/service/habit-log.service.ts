import { Injectable } from '@nestjs/common';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { createHabitLogDto } from '../dto/create-habit-log.dto';

@Injectable()
export class HabitLogService {
  constructor(private readonly habitLogRepository: HabitLogRepository) {}

  async create(data: createHabitLogDto, userId: number) {
    return await this.habitLogRepository.create(data, userId);
  }

  async findByUserAndDate(userId: number, date: string) {
    return await this.habitLogRepository.findByUserAndDate(userId, date);
  }

  async delete(data: createHabitLogDto, userId: number) {
    return await this.habitLogRepository.delete(data, userId);
  }
}
