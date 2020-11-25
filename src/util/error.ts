/* eslint-disable max-classes-per-file */
class CustomError extends Error {
  private code: string;

  private details: CustomError[] | null;

  constructor(
    code: string,
    message: string | null = null,
    details: CustomError[] | null = null,
  ) {
    super(message || code);
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, details?: unknown) {
    super('BAD_REQUEST', message, details as CustomError[]);
  }
}
