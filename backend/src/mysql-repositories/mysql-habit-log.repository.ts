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

  async findByHabitIdAndDate(
    habitId: number,
    date: string,
  ): Promise<HabitLog | null> {
    return await this.repository.findOne({ where: { habitId, date } });
  }
  async countByUserId(userId: number): Promise<number> {
    return this.repository.count({ where: { userId } });
  }

  async findDistinctDatesByUserId(userId: number): Promise<string[]> {
    const rows = await this.repository
      .createQueryBuilder('log')
      .select('DISTINCT DATE_FORMAT(log.date, "%Y-%m-%d")', 'date')
      .where('log.userId = :userId', { userId })
      .orderBy('date', 'DESC')
      .getRawMany();
    return rows.map((row) => row.date);
  }

  async getMonthlySummary(userId: number, month: string): Promise<Record<string, number>> {
    const rows = await this.repository
      .createQueryBuilder('log')
      .select('DATE_FORMAT(log.date, "%Y-%m-%d")', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('log.userId = :userId', { userId })
      .andWhere('DATE_FORMAT(log.date, "%Y-%m") = :month', { month })
      .groupBy('log.date')
      .getRawMany();

    const summary: Record<string, number> = {};
    rows.forEach((row) => { summary[row.date] = Number(row.count); });
    return summary;
  }

  async delete(data: createHabitLogDto, userId: number): Promise<void> {
    await this.repository.delete({ ...data, userId });
  }
}
