import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppService } from '@app/app.service';
import { typeOrmModuleOptions } from '@app/config/orm.config';
import { JobsModule } from '@app/modules/jobs/jobs.module';
import { SchedulerModule } from '@app/modules/scheduler/scheduler.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({ ...typeOrmModuleOptions }),
    }),
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),
    JobsModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
