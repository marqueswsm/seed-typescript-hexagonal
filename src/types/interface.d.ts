import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import { Container } from './core';

export type HttpRouter = Router;
export type HttpRequest = Request;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export interface IHttpInterface {
  serve(): void;
}

export type HttpControllerConfig = {
  validator: typeof import('../interface/http/middleware/validator').validator;
  coreContainer: Container;
};

export interface IHttpRoute {
  // eslint-disable-next-line no-unused-vars
  register(router: HttpRouter): void;
}
