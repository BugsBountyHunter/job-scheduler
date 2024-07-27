import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @Column({ name: 'last_run', type: 'timestamp' })
  lastRun: Date;

  @Column({ name: 'next_run', type: 'timestamp' })
  nextRun: Date;
  @Column({
    type: 'enum',
    enum: JobSchedule,
  })
  schedule: JobSchedule;

  @Column({
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus;
}
