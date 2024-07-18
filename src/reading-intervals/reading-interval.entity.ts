import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class ReadingInterval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startPage: number;

  @Column()
  endPage: number;

  @ManyToOne(() => Book, (book) => book.readingIntervals)
  book: Book;

  @Column()
  userId: number;
}
