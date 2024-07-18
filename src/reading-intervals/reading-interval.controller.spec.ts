import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReadingInterval } from './reading-interval.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Injectable()
class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Mock the request user
    const request = context.switchToHttp().getRequest();
    request.user = { userId: 17, username: 'admin1', password: 'password12345', role: 'admin' };
    return true;
  }
}

@Injectable()
class MockRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.role.includes('admin');
  }
}


  describe('ReadingIntervalsController (e2e)', () => {
      let app: INestApplication;
      let readRepository: Repository<ReadingInterval>;
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        })
        .overrideGuard(AuthGuard('jwt')).useClass(MockAuthGuard)
        .overrideGuard(RolesGuard).useClass(MockRoleGuard)
        .compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
    
        readRepository = moduleFixture.get<Repository<ReadingInterval>>(getRepositoryToken(ReadingInterval));
      });
    
      afterAll(async () => {
        await app.close();
      });

      describe('/reading-intervals (POST)', () => {
        it('should add interval', async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          })
          .overrideGuard(AuthGuard('jwt')).useClass(MockAuthGuard)
          .overrideGuard(RolesGuard).useClass(MockRoleGuard)
          .compile();

          const readingIntervalDto = { name: 'Test Book', numOfPages: 100 };

          return request(app.getHttpServer())
            .post('/reading-intervals')
            .send(readingIntervalDto)
            .expect(201)
            .then(response => {
              expect(response.body).toMatchObject({
                status_code: "success"
              });
            });
        });
      });

});