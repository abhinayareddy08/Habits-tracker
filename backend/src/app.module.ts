import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Habit } from './entities/habits.entity';
import { HabitModule } from './habits/habits.module';
import { HabitLogModule } from './habit-log/habit-log.module';
import { HabitLog } from './entities/habits-logs.entity';
import { DailyEntriesModule } from './daily-entries/daily-entries.module';
import { DailyEntry } from './entities/daily-entries.entity';
import { GamificationModule } from './gamification/gamification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: Number(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: [User, Habit, HabitLog, DailyEntry],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    HabitModule,
    HabitLogModule,
    DailyEntriesModule,
    GamificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
