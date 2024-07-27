import { CreateJobDto } from '@app/modules/jobs/dto/create-job.dto';
import { JobsService } from '@app/modules/jobs/jobs.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller({ path: 'jobs', version: ['1'] })
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jobsService.findOne(id);
  }
}
