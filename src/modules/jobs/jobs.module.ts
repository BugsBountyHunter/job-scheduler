import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { SchedulerModule } from '@app/modules/scheduler/scheduler.module';

@Module({
  imports: [SchedulerModule, TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
