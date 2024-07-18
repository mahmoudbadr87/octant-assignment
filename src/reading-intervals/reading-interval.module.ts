import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingIntervalService } from './reading-interval.service';
import { ReadingIntervalController } from './reading-interval.controller';
import { ReadingInterval } from './reading-interval.entity';
import { BookModule } from '../books/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingInterval]), BookModule],
  providers: [ReadingIntervalService],
  controllers: [ReadingIntervalController],
  exports: [ReadingIntervalService],
})
export class ReadingIntervalModule {}