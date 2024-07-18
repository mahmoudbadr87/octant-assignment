import { Test, TestingModule } from '@nestjs/testing';
import { ReadingIntervalService } from './reading-interval.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReadingInterval } from './reading-interval.entity';
import { Repository } from 'typeorm';

const mockReadingIntervalRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
});

const mockReadingIntervalService = {
  findAll: jest.fn(),
};

describe('ReadingIntervalService', () => {
  let service: ReadingIntervalService;
  let repository: Repository<ReadingInterval>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadingIntervalService,
        {
          provide: getRepositoryToken(ReadingInterval),
          useFactory: mockReadingIntervalRepository,
        },
        {
          provide: ReadingIntervalService,
          useValue: mockReadingIntervalService,
        },
      ],
    }).compile();

    service = module.get<ReadingIntervalService>(ReadingIntervalService);
    repository = module.get<Repository<ReadingInterval>>(getRepositoryToken(ReadingInterval));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
});