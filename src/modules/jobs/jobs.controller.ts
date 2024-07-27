import { CreateJobDto } from '@app/modules/jobs/dto/create-job.dto';
import { Job } from '@app/modules/jobs/entities/job.entity';
import { JobsService } from '@app/modules/jobs/jobs.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'jobs', version: ['1'] })
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
    type: Job,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'Return all jobs.', type: [Job] })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiResponse({ status: 200, description: 'Return the job by ID.', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Param('id') id: number) {
    return this.jobsService.findOne(id);
  }
}
