import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { Repository } from 'typeorm';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  JobSchedule,
  JobScheduleCronMap,
} from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import * as cron from 'node-cron';

describe('SchedulerService', () => {
  let service: SchedulerService;

  let schedulerRegistry: SchedulerRegistry;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulerService,
        SchedulerRegistry,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
        {
          provide: SchedulerRegistry,
          useValue: {
            addCronJob: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
    schedulerRegistry = module.get<SchedulerRegistry>(SchedulerRegistry);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('scheduleJob', () => {
    it('should schedule a job with the correct cron expression', () => {
      const job: Job = {
        id: 1,
        name: 'Test Job',
        lastRun: new Date(),
        nextRun: new Date(),
        schedule: JobSchedule.EVERY_10_MINUTES,
        status: JobStatus.SCHEDULED,
      };

      const cronExpression = JobScheduleCronMap[job.schedule];
      const task = {
        start: jest.fn(),
      };
      jest.spyOn(cron, 'schedule').mockImplementation(() => task as any);
      jest.spyOn(schedulerRegistry, 'addCronJob').mockImplementation(() => {});

      service.scheduleJob(job);

      expect(cron.schedule).toHaveBeenCalledWith(
        cronExpression,
        expect.any(Function),
      );
      expect(schedulerRegistry.addCronJob).toHaveBeenCalledWith(
        `job-${job.id}`,
        task,
      );
      expect(task.start).toHaveBeenCalled();
    });
  });
});
