import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto'; // Import the UpdateBookDto
// import { ReadingIntervalModule } from '../reading-intervals/reading-interval.module';
// import { ReadingInterval } from '../reading-intervals/reading-interval.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    // @InjectRepository(ReadingInterval)
    // private readingIntervalRepository: Repository<ReadingInterval>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({where : {id: id}});
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async getTopBooks(): Promise<any> {
    const books = await this.bookRepository.find({ relations: ['readingIntervals'] });

    // Map to calculate and store total read pages for each book
    const booksWithTotalPages = books.map((book) => {
      let totalReadPages = 0;
      book.readingIntervals.forEach((interval) => {
        // Calculate pages read for this interval
        const pagesRead = interval.endPage - interval.startPage;
        totalReadPages += pagesRead;
      });
      return {
        book_id: book.id,
        book_name: book.name,
        num_of_pages: book.numOfPages,
        num_of_read_pages: totalReadPages,
      };
    });

    // Sort books by num_of_read_pages in descending order
    booksWithTotalPages.sort((a, b) => b.num_of_read_pages - a.num_of_read_pages);

    return booksWithTotalPages.slice(0, 5);
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { name, numOfPages } = createBookDto;

    const newBook = this.bookRepository.create({
      name,
      numOfPages,
    });

    return this.bookRepository.save(newBook);
  }
}