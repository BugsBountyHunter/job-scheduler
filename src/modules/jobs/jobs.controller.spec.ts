import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from '@app/modules/jobs/jobs.service';
import { CreateJobDto } from '@app/modules/jobs/dto/create-job.dto';
import { JobSchedule } from '@app/modules/jobs/enum/job-schedule.enum';
import { JobStatus } from '@app/modules/jobs/enum/job-status.enum';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { IResponse } from '@app/shared/interfaces';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto: CreateJobDto = {
        name: 'Test Job',
        lastRun: new Date(),
        nextRun: new Date(),
        schedule: JobSchedule.EVERY_10_MINUTES,
        status: JobStatus.SCHEDULED,
      };

      const createdJob: Job = {
        ...createJobDto,
        id: 1,
      };
      const result: IResponse<Job> = {
        data: createdJob,
        message: 'Job created successfully',
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createJobDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createJobDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      const jobs: Job[] = [
        {
          id: 1,
          name: 'Test Job',
          lastRun: new Date(),
          nextRun: new Date(),
          schedule: JobSchedule.EVERY_10_MINUTES,
          status: JobStatus.SCHEDULED,
        },
      ];
      const result: IResponse<Job[]> = {
        data: jobs,
        message: 'Job created successfully',
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single job', async () => {
      const job: Job = {
        id: 1,
        name: 'Test Job',
        lastRun: new Date(),
        nextRun: new Date(),
        schedule: JobSchedule.EVERY_10_MINUTES,
        status: JobStatus.SCHEDULED,
      };

      const result: IResponse<Job> = {
        data: job,
        message: 'Job created successfully',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
