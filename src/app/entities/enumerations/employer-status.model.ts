export enum EmployerStatus {
  draft = 'draft',

  valid = 'valid',

  cancelled = 'cancelled',

  confirmed = 'confirmed',
}


export const EMPLOYER_ALLOWED_STATUS: { [_: string]: EmployerStatus[] } = {
  [EmployerStatus.draft]: [
    EmployerStatus.cancelled,
    EmployerStatus.valid
  ],
  [EmployerStatus.valid]: [
    EmployerStatus.confirmed
  ],
}
