import { CreateActiModule } from './create-acti.module';

describe('CreateActiModule', () => {
  let createActiModule: CreateActiModule;

  beforeEach(() => {
    createActiModule = new CreateActiModule();
  });

  it('should create an instance', () => {
    expect(createActiModule).toBeTruthy();
  });
});
