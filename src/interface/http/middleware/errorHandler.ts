import httpStatusCodes from 'http-status-codes';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/interface';
import { BadRequestError } from '../../../util/error';

export const errorHandler = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: HttpNext,
) => {
  let status = httpStatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof BadRequestError) {
    status = httpStatusCodes.BAD_REQUEST;
  }

  return res
    .status(status)
    .send({
      name: err.name,
      message: err.message,
    });
};
