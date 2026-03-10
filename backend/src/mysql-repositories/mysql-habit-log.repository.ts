import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitLog } from 'src/entities/habits-logs.entity';
import { createHabitLogDto } from 'src/habit-log/dto/create-habit-log.dto';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlHabitLogRepository implements HabitLogRepository {
  constructor(
    @InjectRepository(HabitLog)
    private readonly repository: Repository<HabitLog>,
  ) {}

  async create(data: createHabitLogDto, userId: number): Promise<HabitLog> {
    const habitLog = this.repository.create({ ...data, userId });
    return this.repository.save(habitLog);
  }

  async findByUserAndDate(userId: number, date: string): Promise<HabitLog[]> {
    return await this.repository.find({ where: { userId, date } });
  }

  async delete(data: createHabitLogDto, userId: number): Promise<void> {
    await this.repository.delete({ ...data, userId });
  }
}
