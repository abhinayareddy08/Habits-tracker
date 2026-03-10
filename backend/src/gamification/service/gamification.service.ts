import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  async rewardXP(userId: number, xp: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (user) {
      user.xp += xp;
      if (user.xp >= user.level * 100) {
        user.level += 1;
      }
      return await this.repository.save(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
