import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReadingInterval } from '../reading-intervals/reading-interval.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string; // 'user' or 'admin'

  @OneToMany(() => ReadingInterval, (readingInterval) => readingInterval.user)
  readingIntervals: ReadingInterval[];

  // async validatePassword(password: string): Promise<boolean> {
  //   const hash = await bcrypt.hash(password, this.salt);
  //   return hash === this.password;
  // }
}