import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('daily_entries')
export class DailyEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ nullable: true, type: 'varchar' })
  mood: string;

  @Column({ type: 'text', nullable: true })
  journalText: string;

  @CreateDateColumn()
  createdAt: Date;
}
