import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { createHabitDto } from '../dto/create-habit.dto';
import { HabitService } from '../service/habits.service';
import { Habit } from 'src/entities/habits.entity';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: createHabitDto, @Req() req): Promise<Habit> {
    return await this.habitService.create(body, req.user.id);
  }
  @UseGuards(JwtGuard)
  @Get()
  async findByUserId(@Req() req): Promise<Habit[]> {
    return await this.habitService.findByUserId(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.habitService.delete(id);
  }
}
