import { Achievement } from 'src/entities/achievements.entity';

export abstract class AchievementsRepository {
  abstract unlock(userId: number, badgeType: string): Promise<Achievement>;
  abstract findByUserId(userId: number): Promise<Achievement[]>;
  abstract findByUserIdAndBadge(
    userId: number,
    badgeType: string,
  ): Promise<Achievement | null>;
}
