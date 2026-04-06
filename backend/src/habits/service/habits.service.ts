import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Habit } from 'src/entities/habits.entity';
import { createHabitDto } from '../dto/create-habit.dto';
import { HabitRepository } from 'src/repositories/habit.repository';

@Injectable()
export class HabitService {
  constructor(private readonly habitRepository: HabitRepository) {}

  async create(data: createHabitDto, userId: number): Promise<Habit> {
    const exsistingHabit = await this.habitRepository.findByNameAndUserId(
      data.name,
      userId,
    );
    if (exsistingHabit) {
      throw new ConflictException('Habit Already Exists');
    }
    return await this.habitRepository.create(data, userId);
  }

  async findByUserId(userId: number): Promise<Habit[]> {
    return await this.habitRepository.findByUserId(userId);
  }

  async delete(id: number, userId: number): Promise<void> {
    const habit = await this.habitRepository.findById(id);
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }
    if (habit.userId !== userId) {
      throw new ForbiddenException('You cannot delete this habit');
    }
    await this.habitRepository.delete(id);
  }
}
