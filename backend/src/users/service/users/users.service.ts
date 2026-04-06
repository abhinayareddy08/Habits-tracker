import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { UserStatsDto } from 'src/users/dto/user-stats.dto';
import { HabitLogRepository } from 'src/repositories/habit-log.repository';
import { DailyEntriesRepository } from 'src/repositories/daily-entries.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly habitLogRepository: HabitLogRepository,
    private readonly dailyEntriesRepository: DailyEntriesRepository,
  ) {}

  async create(data: createUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User Not Found Exception');
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async getStats(userId: number): Promise<UserStatsDto> {
    const [totalHabitsCompleted, totalJournalEntries, user] = await Promise.all([
      this.habitLogRepository.countByUserId(userId),
      this.dailyEntriesRepository.countByUserId(userId),
      this.userRepository.findById(userId),
    ]);

    return {
      totalHabitsCompleted,
      totalJournalEntries,
      currentStreak: user?.currentStreak ?? 0,
      longestStreak: user?.longestStreak ?? 0,
    };
  }
}
