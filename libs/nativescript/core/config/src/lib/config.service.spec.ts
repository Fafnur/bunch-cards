import { Config, ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  const CONFIG_STUB: Config = {
    googleClientId: `.apps.googleusercontent.com`,
    googleUrlScheme: `com.googleusercontent.apps.`,
    googleCallback: `com.googleusercontent.apps.:/auth`,
  };

  beforeEach(() => {
    service = new ConfigService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return config', () => {
    expect(service.config).toEqual(CONFIG_STUB);
  });
});
