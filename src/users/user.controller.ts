import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './user.entity';

@Controller('auth')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) { //: Promise<User>
        return this.usersService.register(createUserDto);
    }
}