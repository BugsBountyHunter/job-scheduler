import { PaginationOptions } from '@app/shared/enums/pagination-options.dto';

export interface IResponse<T> {
  data?: T | null;
  errors?: string[] | any[] | object | null;
  message?: string | null;
  paginationOption?: PaginationOptions | object | null;
  status?: number;
  statusCode?: number | null;
}
