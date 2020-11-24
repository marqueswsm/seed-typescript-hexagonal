import { env } from './util/env';
import createContainer from './interface/container';

export default class App {
  private http: boolean;

  constructor({ http }) {
    this.http = http;
  }

  run() {
    const interfaceContainer = createContainer({
      env,
      init: {
        http: this.http,
      },
    });

    if (this.http) {
      interfaceContainer.httpInterface.serve();
    }
  }
}

const app = new App({
  http: env.httpActive,
});

setImmediate(() => {
  app.run();
});
