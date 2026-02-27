import { IsEmail, MinLength } from 'class-validator';

export class loginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
