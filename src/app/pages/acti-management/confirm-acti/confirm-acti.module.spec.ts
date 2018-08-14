import { ConfirmActiModule } from './confirm-acti.module';

describe('ConfirmActiModule', () => {
  let confirmActiModule: ConfirmActiModule;

  beforeEach(() => {
    confirmActiModule = new ConfirmActiModule();
  });

  it('should create an instance', () => {
    expect(confirmActiModule).toBeTruthy();
  });
});
