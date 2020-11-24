import {
  HttpNext,
  HttpRequest,
  HttpResponse,
  HttpRouter,
  IHttpRoute,
} from '../../../types/interface';

export class ReferenceController implements IHttpRoute {
  register(router: HttpRouter): void {
    router.route('/references')
      .get(
        this.createReference.bind(this),
      )
  }

  async createReference(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      res.status(200).send({
        title: 'Cloud Computing',
        citation: 'Cloud computing is amazing',
      })
    } catch (error) {
      next(error);
    }
  }
}