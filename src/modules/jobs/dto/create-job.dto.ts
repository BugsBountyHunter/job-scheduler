import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { IsString, IsDateString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  lastRun: Date;

  @IsDateString()
  nextRun: Date;

  @IsEnum(JobSchedule)
  schedule: JobSchedule;

  @IsEnum(JobStatus)
  status: JobStatus;
}
