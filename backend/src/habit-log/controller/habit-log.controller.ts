import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HabitLogService } from '../service/habit-log.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { createHabitLogDto } from '../dto/create-habit-log.dto';
import { HabitLog } from 'src/entities/habits-logs.entity';

@Controller('habit-logs')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: createHabitLogDto, @Req() req): Promise<HabitLog> {
    return await this.habitLogService.create(body, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':date')
  async findByUserIdAndDate(
    @Param('date') date: string,
    @Req()
    req,
  ): Promise<HabitLog[]> {
    return this.habitLogService.findByUserAndDate(req.user.id, date);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async delete(@Body() body: createHabitLogDto, @Req() req): Promise<void> {
    return this.habitLogService.delete(body, req.user.id);
  }
}
