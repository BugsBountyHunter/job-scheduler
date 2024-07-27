//defined aliases because end user can use any of the aliases to refer to the same value
export enum JobSchedule {
  EVERY_MINUTE = 'EVERY_MINUTE',
  EVERY_5_MINUTES = 'EVERY_5_MINUTES',
  EVERY_10_MINUTES = 'EVERY_10_MINUTES',
  EVERY_HOUR = 'EVERY_HOUR',
  DAILY = 'DAILY',
}

export const JobScheduleCronMap: { [key in JobSchedule]: string } = {
  [JobSchedule.EVERY_MINUTE]: '*/1 * * * *',
  [JobSchedule.EVERY_5_MINUTES]: '*/5 * * * *',
  [JobSchedule.EVERY_10_MINUTES]: '*/10 * * * *',
  [JobSchedule.EVERY_HOUR]: '0 * * * *',
  [JobSchedule.DAILY]: '0 0 * * *',
};
