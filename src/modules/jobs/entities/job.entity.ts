import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @ApiProperty({ description: 'The ID of the job' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the job' })
  @Column({ name: 'name', unique: true })
  name: string;

  @ApiProperty({ description: 'The last run timestamp of the job' })
  @Column({ name: 'last_run', type: 'timestamp' })
  lastRun: Date;

  @ApiProperty({ description: 'The next run timestamp of the job' })
  @Column({ name: 'next_run', type: 'timestamp' })
  nextRun: Date;

  @ApiProperty({ description: 'The schedule of the job', enum: JobSchedule })
  @Column({
    type: 'enum',
    enum: JobSchedule,
  })
  schedule: JobSchedule;

  @ApiProperty({ description: 'The status of the job', enum: JobStatus })
  @Column({
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus;
}
