import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@bunch/api/auth';
import { CardModule } from '@bunch/api/card';
import { CardGroupModule } from '@bunch/api/card-groups';
import { MailModule } from '@bunch/api/mail';
import { UserModule } from '@bunch/api/users';

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
    MailModule,
    UserModule,
    AuthModule,
    CardModule,
    CardGroupModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
