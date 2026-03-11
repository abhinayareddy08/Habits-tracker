import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AchievementsService } from '../service/achievements.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findByUserId(@Req() req) {
    return this.achievementsService.findByUserId(req.user.id);
  }
}
