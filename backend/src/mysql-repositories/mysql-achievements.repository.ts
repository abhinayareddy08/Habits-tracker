import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/achievements.entity';
import { AchievementsRepository } from 'src/repositories/achievements.repository';
import { Repository } from 'typeorm';

@Injectable()
export class MysqlAchievementsRepository implements AchievementsRepository {
  constructor(
    @InjectRepository(Achievement)
    private readonly repository: Repository<Achievement>,
  ) {}

  async unlock(userId: number, badgeType: string): Promise<Achievement> {
    const createBadge = this.repository.create({ userId, badgeType });
    return this.repository.save(createBadge);
  }

  async findByUserId(userId: number): Promise<Achievement[]> {
    return await this.repository.find({ where: { userId } });
  }

  async findByUserIdAndBadge(
    userId: number,
    badgeType: string,
  ): Promise<Achievement | null> {
    return await this.repository.findOne({ where: { userId, badgeType } });
  }
}
