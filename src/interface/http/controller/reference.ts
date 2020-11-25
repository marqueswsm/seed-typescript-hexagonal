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
  private referenceUseCase: HttpControllerConfig['coreContainer']['referenceUseCase'];

  constructor({ coreContainer }: HttpControllerConfig) {
    this.referenceUseCase = coreContainer.referenceUseCase;
  }

  register(router: HttpRouter): void {
    router.route('/v1/references')
      .post(
        this.createReference.bind(this),
      )
  }

  async createReference(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      const reference = req.body;

      const result = await this.referenceUseCase.createReference(reference as Reference);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}