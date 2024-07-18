import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, payload: string) => void): Promise<any> {
    const user = await this.usersService.findOneByUsername(payload.username);
    return user ? done(null, user.username) : done(null, null);

    // return await this.userRepository.findOneOrFail({ id: Number(userId) })
    //   .then(user => done(null, user))
    //   .catch(error => done(error));
  }
}