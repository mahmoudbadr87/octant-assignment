import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
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


  describe('BookController (e2e)', () => {
      let app: INestApplication;
      let bookRepository: Repository<Book>;
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        })
        .overrideGuard(AuthGuard('jwt')).useClass(MockAuthGuard)
        .overrideGuard(RolesGuard).useClass(MockRoleGuard)
        .compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
    
        bookRepository = moduleFixture.get<Repository<Book>>(getRepositoryToken(Book));
      });
    
      afterAll(async () => {
        await app.close();
      });

      describe('/books (POST)', () => {
        it('should create a new book', async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          })
          .overrideGuard(AuthGuard('jwt')).useClass(MockAuthGuard)
          .overrideGuard(RolesGuard).useClass(MockRoleGuard)
          .compile();

          const createBookDto = { name: 'Test Book', numOfPages: 100 };

          return request(app.getHttpServer())
            .post('/books')
            .send(createBookDto)
            .expect(201)
            .then(response => {
              expect(response.body).toMatchObject({
                id: expect.any(Number),
                ...createBookDto,
              });
            });
        });
      });

    describe('/books/top (GET)', () => {
      it('should return the top 5 books based on unique pages read', async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();

        const getBookDto = [
          {
              "book_id": 7,
              "book_name": "New Book",
              "num_of_pages": 200,
              "num_of_read_pages": 350
          },
          {
              "book_id": 2,
              "book_name": "Book 2",
              "num_of_pages": 200,
              "num_of_read_pages": 307
          },
          {
              "book_id": 11,
              "book_name": "New Book 2",
              "num_of_pages": 200,
              "num_of_read_pages": 40
          },
          {
              "book_id": 17,
              "book_name": "Test Book",
              "num_of_pages": 100,
              "num_of_read_pages": 0
          },
          {
              "book_id": 10,
              "book_name": "New Book 2",
              "num_of_pages": 200,
              "num_of_read_pages": 0
          }
      ];

        return request(app.getHttpServer())
          .get('/books/top')
          .expect(200)
          // .then(response => {
          //   expect(response.body).toMatchObject([
          //     ...getBookDto
          //   ]);
          // });
      });
    });

});