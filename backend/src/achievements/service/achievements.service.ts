import { Injectable } from '@nestjs/common';
import { Achievement } from 'src/entities/achievements.entity';
import { AchievementsRepository } from 'src/repositories/achievements.repository';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  async unlock(userId: number, badgeType: string): Promise<Achievement> {
    const exsisting = await this.achievementsRepository.findByUserIdAndBadge(
      userId,
      badgeType,
    );
    if (exsisting) {
      return exsisting;
    }
    return this.achievementsRepository.unlock(userId, badgeType);
  }

  async findByUserId(userId: number): Promise<Achievement[]> {
    return this.achievementsRepository.findByUserId(userId);
  }
}
