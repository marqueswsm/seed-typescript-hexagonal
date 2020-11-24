import { HttpInterface } from './http';
import { IHttpInterface } from '../types/interface';

type ContainerConfig = {
  env: typeof import('../util/env').env;
  init: {
    http?: boolean;
  };
};

type Container = {
  httpInterface?: IHttpInterface;
};

export default function createContainer(config: ContainerConfig): Container {
  const container: Container = {};

  if (config.init.http) {
    container.httpInterface = new HttpInterface({
      env: config.env,
    });
  }

  return container;
}
