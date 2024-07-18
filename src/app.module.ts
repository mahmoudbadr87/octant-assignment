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
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
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
  ],
})
export class AppModule {}