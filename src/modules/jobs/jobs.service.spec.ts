import { JobsService } from './jobs.service';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { SchedulerService } from '@app/modules/scheduler/scheduler.service';
import { CreateJobDto } from '@app/modules/jobs/dto/create-job.dto';
import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { IResponse } from '@app/shared/interfaces';

describe('JobsService', () => {
  let service: JobsService;
  let repository: Repository<Job>;
  let schedulerService: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        SchedulerService,
        {
          provide: getRepositoryToken(Job),
          useClass: Repository,
        },
        {
          provide: SchedulerRegistry,
          useValue: {
            addCronJob: jest.fn(),
            getCronJob: jest.fn(),
            deleteCronJob: jest.fn(),
            getCronJobs: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repository = module.get<Repository<Job>>(getRepositoryToken(Job));
    schedulerService = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new job and schedule it', async () => {
      const createJobDto: CreateJobDto = {
        name: 'Test Job',
        lastRun: new Date(),
        nextRun: new Date(),
        schedule: JobSchedule.EVERY_10_MINUTES,
        status: JobStatus.SCHEDULED,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(createJobDto as Job);
      jest.spyOn(schedulerService, 'scheduleJob').mockImplementation(() => {});

      const result = await service.create(createJobDto);

      expect(repository.save).toHaveBeenCalledWith(createJobDto);
      expect(schedulerService.scheduleJob).toHaveBeenCalledWith(createJobDto);
      expect(result).toEqual(<IResponse<Job>>{
        data: createJobDto as Job,
        message: 'Job created successfully',
      });
      console.log({ result, createJobDto });
    });
  });
});
