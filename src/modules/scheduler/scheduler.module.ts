import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { SchedulerService } from '@app/modules/scheduler/scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), ScheduleModule.forRoot()],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
