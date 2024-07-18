import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingInterval } from './reading-interval.entity';
import { BookService } from '../books/book.service';
import { CreateReadingIntervalDto } from './dto/create-reading-interval.dto';

@Injectable()
export class ReadingIntervalService {
  constructor(
    @InjectRepository(ReadingInterval)
    private readingIntervalRepository: Repository<ReadingInterval>,
    private readonly booksService: BookService
  ) {}

  async addReadingInterval(userId: number, createReadingIntervalDto: CreateReadingIntervalDto): Promise<any> {
    const { startPage, endPage, bookId } = createReadingIntervalDto;

    const book = await this.booksService.findOne(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const readingInterval = this.readingIntervalRepository.create({
      startPage,
      endPage,
      book,
      userId,
    });

    this.readingIntervalRepository.save(readingInterval);
    return {'status_code' : 'success'}
  }
}