import { ConfirmActiRoutingModule } from './confirm-acti-routing.module';

describe('ConfirmActiRoutingModule', () => {
  let confirmActiRoutingModule: ConfirmActiRoutingModule;

  beforeEach(() => {
    confirmActiRoutingModule = new ConfirmActiRoutingModule();
  });

  it('should create an instance', () => {
    expect(confirmActiRoutingModule).toBeTruthy();
  });
});
