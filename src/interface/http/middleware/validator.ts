import { AnySchema } from 'joi';
import { curryN } from 'ramda';

import { BadRequestError } from '../../../util/error';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/interface';

export const validator = curryN(
  4,
  (schema: AnySchema, req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return next(new BadRequestError('Invalid request params', validation.error.details));
    }

    Object.assign(req, validation.value);

    return next();
  },
);
