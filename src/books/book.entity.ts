import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReadingInterval } from '../reading-intervals/reading-interval.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  numOfPages: number;

  @OneToMany(() => ReadingInterval, readingInterval => readingInterval.book)
  readingIntervals: ReadingInterval[];
}