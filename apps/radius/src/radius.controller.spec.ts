import { Test, TestingModule } from '@nestjs/testing';
import { RadiusController } from './radius.controller';
import { RadiusService } from './radius.service';

describe('RadiusController', () => {
  let radiusController: RadiusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RadiusController],
      providers: [RadiusService],
    }).compile();

    radiusController = app.get<RadiusController>(RadiusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(radiusController.message).toBe('Hello World!');
    });
  });
});
