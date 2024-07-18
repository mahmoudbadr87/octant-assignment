import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { ReadingIntervalService } from './reading-interval.service';
import { CreateReadingIntervalDto } from './dto/create-reading-interval.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';

@Controller('reading-intervals')
export class ReadingIntervalController {
  constructor(private readonly readingIntervalService: ReadingIntervalService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // @Roles('admin')
  async addReadingInterval(@Request() req, @Body() createReadingIntervalDto: CreateReadingIntervalDto) {
    const userId = req.user.id;
    return this.readingIntervalService.addReadingInterval(userId, createReadingIntervalDto);
  }
}