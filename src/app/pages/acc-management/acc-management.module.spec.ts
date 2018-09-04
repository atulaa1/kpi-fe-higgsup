import { AccManagementModule } from './acc-management.module';

describe('AccManagementModule', () => {
  let accManagementModule: AccManagementModule;

  beforeEach(() => {
    accManagementModule = new AccManagementModule();
  });

  it('should create an instance', () => {
    expect(accManagementModule).toBeTruthy();
  });
});
