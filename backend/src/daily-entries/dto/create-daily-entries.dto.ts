import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class createDailyEntriesDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsOptional()
  mood?: string;

  @IsString()
  @IsOptional()
  journalText?: string;
}
