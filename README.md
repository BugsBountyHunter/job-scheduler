# Job Scheduler Microservice

This is a job scheduler microservice built with NestJS that allows for scheduling and managing jobs. The service includes API endpoints for creating, listing, and retrieving job details. The jobs can be customized and scheduled with flexible configurations.

## Features

- **Job Scheduling**: Schedule customized jobs with various configurations.
- **API Endpoints**:
  - `GET /jobs`: List all available jobs.
  - `GET /jobs/:id`: Retrieve details of a specific job by ID.
  - `POST /jobs`: Create new jobs.
- **Database Integration**: Store job-related information such as job name, timestamps, and scheduling details.
- **Customization**: Define specific attributes, scheduling intervals, and parameters for each job.
- **Scalability**: Designed to handle increased complexity and scale for global usage.

## Technologies Used

- **Language**: TypeScript
- **Framework**: NestJS
- **Database**: PostgreSQL
- **Testing**: Jest

## start and run project using docker

create `.env` file and add configuration like this for application and database

```
#App
NODE_ENV={production,development..etc}
PORT={port}

#Database Production
POSTGRES_HOST={database host}
POSTGRES_DATABASE={database name}
POSTGRES_USERNAME={database username}
POSTGRES_PASSWORD={database password}
POSTGRES_PORT={database port}
SSL=false
REJECT_UNAUTHORIZED=false
```

and run

```
docker-compose up --build
```

## Installation

**Clone the repository**:

```bash
git clone https://github.com/BugsBountyHunter/job-scheduler.git
cd job-scheduler
```
