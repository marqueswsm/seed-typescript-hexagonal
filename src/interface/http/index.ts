import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { IHttpInterface, IHttpRoute } from '../../types/interface';
import { ReferenceController } from './controller/reference';

type Config = {
  env: typeof import('../../util/env').env;
};

export default class HttpInterface implements IHttpInterface {
  private env: Config['env'];

  private app: express.Application;

  constructor(config: Config) {
    this.env = config.env;
  }

  initApp() {
    this.app = express();

    this.app.use(
      helmet(),
      bodyParser.json({
        limit: '500kb',
      }),
    );

    this.setupRoutes();
  }

  setupRoutes() {
    const controllers = [
      new ReferenceController(),
    ];

    controllers.forEach((route: IHttpRoute) => {
      const router = express.Router({ mergeParams: true });
      route.register(router);
      this.app.use(router);
    });
  }

  serve(): void {
    this.initApp();
    this.app.listen(this.env.httpPort);
  }
}
