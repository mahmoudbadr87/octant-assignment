import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const thisUser = await this.usersService.findOneByUsername(username);

      if (thisUser) {
        const isPasswordMatched = await bcrypt.compare(password, thisUser.password);
        if(isPasswordMatched) {
          // return thisUser
          const { password, ...result } = thisUser;
          return result;
        }
      }
      return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { username, password } = loginUserDto;
    const getUser = await this.validateUser(username, password);
    if (!getUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }


    const payload = { username: getUser.username, sub: getUser.userId, role: getUser.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}