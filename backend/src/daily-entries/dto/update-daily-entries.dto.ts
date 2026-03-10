import { IsOptional, IsString } from "class-validator";

export class updateDailyEntriesDto{
     @IsString()
      @IsOptional()
      mood?: string;
    
      @IsString()
      @IsOptional()
      journalText?: string;
}