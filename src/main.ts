import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'your_secret_key', // Replace with a secure key
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // Optional: Set cookie expiration time
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(3000);
}
bootstrap();
