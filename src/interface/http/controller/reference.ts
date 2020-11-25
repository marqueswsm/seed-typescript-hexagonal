import { createReferenceSchema } from '../schema/reference';

import {
  HttpControllerConfig,
  HttpNext,
  HttpRequest,
  HttpResponse,
  HttpRouter,
  IHttpRoute,
} from '../../../types/interface';
import { Reference } from '../../../types/reference';

export class ReferenceController implements IHttpRoute {
  private validator: HttpControllerConfig['validator'];

  private referenceUseCase: HttpControllerConfig['coreContainer']['referenceUseCase'];

  constructor({ coreContainer, validator }: HttpControllerConfig) {
    this.referenceUseCase = coreContainer.referenceUseCase;
    this.validator = validator;
  }

  register(router: HttpRouter): void {
    router.route('/v1/references')
      .post(
        this.validator(createReferenceSchema),
        this.createReference.bind(this),
      );
  }

  async createReference(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      const reference = req.body;

      const result = await this.referenceUseCase.createReference(reference as Reference);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
