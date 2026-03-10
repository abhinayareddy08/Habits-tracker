import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DailyEntriesService } from '../service/daily-entries.service';
import { createDailyEntriesDto } from '../dto/create-daily-entries.dto';
import { DailyEntry } from 'src/entities/daily-entries.entity';
import { updateDailyEntriesDto } from '../dto/update-daily-entries.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('daily-entries')
export class DailyEntriesController {
  constructor(private readonly dailyEntriesService: DailyEntriesService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() data: createDailyEntriesDto,
    @Req() req,
  ): Promise<DailyEntry> {
    return this.dailyEntriesService.create(data, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch(':date')
  async update(
    @Param('date') date: string,
    @Body() body: updateDailyEntriesDto,
    @Req() req,
  ): Promise<DailyEntry> {
    return this.dailyEntriesService.update(date, body, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':date')
  async findByDateAndUserId(@Param('date') date: string, @Req() req) {
    return this.dailyEntriesService.findByDateAndUserId(date, req.user.id);
  }
}
