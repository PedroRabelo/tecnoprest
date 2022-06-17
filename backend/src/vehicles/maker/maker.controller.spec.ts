import { Test, TestingModule } from '@nestjs/testing';
import { MakerController } from './maker.controller';
import { MakerService } from './maker.service';

describe('MakerController', () => {
  let controller: MakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakerController],
      providers: [MakerService],
    }).compile();

    controller = module.get<MakerController>(MakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
