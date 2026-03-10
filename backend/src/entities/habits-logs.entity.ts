import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Habit } from './habits.entity';
import { User } from './user.entity';

@Entity('habits_logs')
export class HabitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Habit)
  @JoinColumn({ name: 'habitId' })
  habit:Habit;

  @Column()
  habitId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user:User;

  @Column()
  userId: number;

  @Column({ type: 'date' })
  date: string;
}
