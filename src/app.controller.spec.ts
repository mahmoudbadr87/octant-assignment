import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Welcome to Octane assignment!"', () => {
      expect(appController.getHello()).toBe('Welcome to Octane assignment!');
    });

    it('should return "Healthy"', () => {
      expect(appController.getHealth()).toBe('Healthy');
    });
  });
});