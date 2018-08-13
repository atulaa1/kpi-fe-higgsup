import { CreateActiRoutingModule } from './create-acti-routing.module';

describe('CreateActiRoutingModule', () => {
  let createActiRoutingModule: CreateActiRoutingModule;

  beforeEach(() => {
    createActiRoutingModule = new CreateActiRoutingModule();
  });

  it('should create an instance', () => {
    expect(createActiRoutingModule).toBeTruthy();
  });
});
