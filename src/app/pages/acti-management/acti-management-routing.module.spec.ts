import { ActiManagementRoutingModule } from './acti-management-routing.module';

describe('ActiManagementRoutingModule', () => {
  let actiManagementRoutingModule: ActiManagementRoutingModule;

  beforeEach(() => {
    actiManagementRoutingModule = new ActiManagementRoutingModule();
  });

  it('should create an instance', () => {
    expect(actiManagementRoutingModule).toBeTruthy();
  });
});
