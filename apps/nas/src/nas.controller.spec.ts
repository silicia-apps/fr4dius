import { Test, TestingModule } from '@nestjs/testing';
import { NasController } from './nas.controller';
import { NasService } from './nas.service';

describe('NasController', () => {
  let nasController: NasController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NasController],
      providers: [NasService],
    }).compile();

    nasController = app.get<NasController>(NasController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nasController.reverseLookup).toBe('Hello World!');
    });
  });
});
