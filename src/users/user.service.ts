import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async register(createUserDto: CreateUserDto) {

    const { username, password } = createUserDto;
    const existingUser = await this.findOneByUsername(username);

    if (existingUser) {

      throw new ConflictException('Username already exists');

    }

    // const newSalt = await bcrypt.genSalt(roundsOfHashing);
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    console.log('createUserDto.password :' + createUserDto.password)
    // console.log('newSalt :' + newSalt)

    return this.create({
        // ...createUserDto,
        username: createUserDto.username,
        password: hashedPassword,
        role: createUserDto.role,
    });

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    // Create a new user entity with the hashed password
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
}