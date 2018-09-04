import { SeminarModule } from './seminar.module';

describe('SeminarModule', () => {
  let seminarModule: SeminarModule;

  beforeEach(() => {
    seminarModule = new SeminarModule();
  });

  it('should create an instance', () => {
    expect(seminarModule).toBeTruthy();
  });
});
