import httpStatusCodes from 'http-status-codes';

import { HttpRequest, HttpResponse } from '../../../types/interface';
import { BadRequestError } from '../../../util/error';

export const errorHandler = (
  err: Error,
  req: HttpRequest,
  res: HttpResponse,
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
