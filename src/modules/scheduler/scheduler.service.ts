import { Job } from '@app/modules/jobs/entities/job.entity';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as cron from 'node-cron';
import { JobScheduleCronMap } from '@app/modules/jobs/enum/job-schedule.enum';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    await this.init();
  }

  /**
   * Execute a job
   * @param jobId - The job id to execute
   */
  async init() {
    const jobs = await this.jobsRepository.find();
    jobs.forEach((job) => {
      this.scheduleJob(job);
      this.logger.log(`Scheduled job: ${job.name} - ${job.schedule}`);
    });
  }

  /**
   * Schedule a job based on its cron expression
   * @param job - The job to schedule
   */
  scheduleJob(job: Job) {
    const jobName = `job-${job.id}`;
    const cronExpression = JobScheduleCronMap[job.schedule];

    const task = cron.schedule(cronExpression, async () => {
      this.logger.log(`Executing job: ${job.name}`);
      await this.executeJob(job.id); // Pass the job id to the executeJob method
    });

    this.schedulerRegistry.addCronJob(jobName, task);
    task.start();
  }

  /**
   * Execute a job
   * @param jobId - The job id to execute
   */
  private async executeJob(jobId: number) {
    const job = await this.jobsRepository.findOne({ where: { id: jobId } });
    if (!job) {
      this.logger.error(`Job not found: ${jobId}`);
      return;
    }

    this.logger.log(`Executing job: ${job.name}`);

    // Simulate job execution logic here
    job.lastRun = new Date();
    job.status = JobStatus.RUNNING;
    await this.jobsRepository.save(job);

    // Simulate job completion
    job.status = JobStatus.COMPLETED;
    job.nextRun = this.calculateNextRun(job.schedule);
    await this.jobsRepository.save(job);

    this.logger.log(`Job completed: ${job.name}`);
  }

  private calculateNextRun(cronExpression: string): Date {
    const nextRun = cron.nextDates(cronExpression, 1).toDate();
    return nextRun;
  }
}
