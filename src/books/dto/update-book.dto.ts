import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  numOfPages: number;
}