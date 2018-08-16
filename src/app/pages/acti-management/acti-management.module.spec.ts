import { ActiManagementModule } from './acti-management.module';

describe('ActiManagementModule', () => {
  let actiManagementModule: ActiManagementModule;

  beforeEach(() => {
    actiManagementModule = new ActiManagementModule();
  });

  it('should create an instance', () => {
    expect(actiManagementModule).toBeTruthy();
  });
});
