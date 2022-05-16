import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function mailFactory(configService: ConfigService) {
  const transport = configService.get<string>('MAIL_TRANSPORT') ?? '';
  const from = configService.get<string>('MAIL_FROM') ?? '';

  if (!transport || !from) {
    console.warn('Mail transport is empty.');
  }

  return {
    transport,
    defaults: { from },
    template: {
      dir: __dirname + '/assets/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
}

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mailFactory,
    }),
  ],
})
export class MailModule {}
