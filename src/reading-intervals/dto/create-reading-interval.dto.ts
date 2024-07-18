import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateReadingIntervalDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'startPage must be greater than to 0' })
  startPage: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'endPage must be greater than to 0' })
  endPage: number;

  @IsInt()
  @IsNotEmpty()
  bookId: number;
}

