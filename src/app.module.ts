import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { BookModule } from './books/book.module';
import { ReadingIntervalModule } from './reading-intervals/reading-interval.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ReadingInterval } from './reading-intervals/reading-interval.entity';
import { Book } from './books/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the config module global
      envFilePath: ['.env'], // specify the env file to load
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, ReadingInterval, Book],
      synchronize: true, // Disable in production
    }),
    AuthModule,
    UsersModule,
    BookModule,
    ReadingIntervalModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
})
export class AppModule {}