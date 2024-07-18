import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { ReadingInterval } from '../reading-intervals/reading-interval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, ReadingInterval])],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}