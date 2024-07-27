import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsISO8601 } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'Name of the job' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Last run timestamp of the job',
    example: '2024-07-27T10:00:00.000Z',
  })
  @IsISO8601()
  lastRun: Date;

  @ApiProperty({
    description: 'Next run timestamp of the job',
    example: '2024-07-27T10:10:00.000Z',
  })
  @IsISO8601()
  nextRun: Date;

  @ApiProperty({ description: 'Schedule of the job', enum: JobSchedule })
  @IsEnum(JobSchedule)
  schedule: JobSchedule;

  @ApiProperty({ description: 'Status of the job', enum: JobStatus })
  @IsEnum(JobStatus)
  status: JobStatus;
}
