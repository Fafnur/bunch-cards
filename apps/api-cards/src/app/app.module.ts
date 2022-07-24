import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@bunch/api/auth';
import { CardModule } from '@bunch/api/card';
import { MailModule } from '@bunch/api/mail';
import { UserModule } from '@bunch/api/users';
import { GroupModule } from '@bunch/api-groups';

import { AppController } from './app.controller';
import { configurationFactory, typeOrmFactory } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [configurationFactory],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmFactory,
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    MailModule,
    UserModule,
    AuthModule,
    CardModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
