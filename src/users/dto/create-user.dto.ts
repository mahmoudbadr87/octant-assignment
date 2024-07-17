import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    salt: string;

    @IsString()
    role: string;
}