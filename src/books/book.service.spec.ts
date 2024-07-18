import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
// import { ReadingInterval } from '../reading-intervals/reading-interval.entity';
import { Repository } from 'typeorm';

const mockBookRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  // Add other methods you are using in your service
});

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useFactory: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
});