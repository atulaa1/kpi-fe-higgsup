import { AccManagementsModule } from './acc-managements.module';

describe('AccManagementsModule', () => {
  let accManagementsModule: AccManagementsModule;

  beforeEach(() => {
    accManagementsModule = new AccManagementsModule();
  });

  it('should create an instance', () => {
    expect(accManagementsModule).toBeTruthy();
  });
});
