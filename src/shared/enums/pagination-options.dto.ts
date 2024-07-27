import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationOptions {
  @IsOptional()
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  limit: number = 25;
}
