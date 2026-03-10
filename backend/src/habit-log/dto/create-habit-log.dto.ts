import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class createHabitLogDto {
  @IsNumber()
  @IsNotEmpty()
  habitId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
