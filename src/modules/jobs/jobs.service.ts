import { CreateJobDto } from '@app/modules/jobs/dto/create-job.dto';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { SchedulerService } from '@app/modules/scheduler/scheduler.service';
import { IResponse } from '@app/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly schedulerService: SchedulerService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const savedJob = await this.jobsRepository.save(createJobDto);
    this.schedulerService.scheduleJob(savedJob);
    return <IResponse<Job>>{
      data: savedJob,
      message: 'Job created successfully',
    };
  }

  async findAll() {
    const jobs = await this.jobsRepository.find();
    return <IResponse<Job[]>>{
      data: jobs,
      message: 'Jobs retrieved successfully',
    };
  }

  async findOne(id: number) {
    const job = await this.jobsRepository.findOne({ where: { id } });
    return <IResponse<Job>>{
      data: job,
      message: 'Job retrieved successfully',
    };
  }
}
