import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from 'src/entities/habits.entity';
import { createHabitDto } from 'src/habits/dto/create-habit.dto';
import { HabitRepository } from 'src/repositories/habit.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MysqHabitRepository implements HabitRepository {
  constructor(
    @InjectRepository(Habit)
    private readonly repository: Repository<Habit>,
  ) {}

  async create(data: createHabitDto, userId: number): Promise<Habit> {
    const habit = this.repository.create({ ...data, userId });
    return this.repository.save(habit);
  }

  async findByUserId(userId: number): Promise<Habit[]> {
    return await this.repository.find({ where: { userId } });
  }
  async findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<Habit | null> {
    return await this.repository.findOne({ where: { name, userId } });
  }
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
