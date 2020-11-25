import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { ReferenceController } from './controller/reference';
import { validator } from './middleware/validator';
import { errorHandler } from './middleware/errorHandler';

import { IHttpInterface, IHttpRoute } from '../../types/interface';
import { Container } from '../../types/core';

type Config = {
  // eslint-disable-next-line no-undef
  env: typeof import('../../util/env').env;
  coreContainer: Container;
};

export default class HttpInterface implements IHttpInterface {
  private env: Config['env'];

  private coreContainer: Config['coreContainer'];

  private app: express.Application;

  constructor(config: Config) {
    this.env = config.env;
    this.coreContainer = config.coreContainer;
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
    this.app.use(errorHandler);
  }

  setupRoutes() {
    const controllers = [
      new ReferenceController({
        coreContainer: this.coreContainer,
        validator,
      }),
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
