import { Habit } from 'src/entities/habits.entity';
import { createHabitDto } from 'src/habits/dto/create-habit.dto';

export abstract class HabitRepository {
  abstract create(data: createHabitDto, userId: number): Promise<Habit>;
  abstract findByUserId(userId: number): Promise<Habit[]>;
  abstract findByNameAndUserId(
    name: string,
    userId: number,
  ): Promise<Habit | null>;
  abstract delete(id: number): Promise<void>;
}
