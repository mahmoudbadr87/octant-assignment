import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv'
import { jwtConstants } from './auth/constants';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: jwtConstants.secret, // Replace with a secure key
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
