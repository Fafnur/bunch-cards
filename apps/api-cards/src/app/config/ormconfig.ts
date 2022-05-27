import { join } from 'path';

import { getTypeOrmConfig } from './config';

// Note: Config for migrations
export = {
  ...getTypeOrmConfig(),
  entities: [`${join(__dirname, '../')}**/*.entity.{ts,js}`, `${join(__dirname, '../../../../../')}libs/api/**/*.entity.{ts,js}`],
  migrations: [`${join(__dirname, '../../../../../')}apps/api-cards/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `apps/api-cards/migrations`,
  },
};
