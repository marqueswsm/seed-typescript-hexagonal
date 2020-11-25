import HttpInterface from './http';
import { IHttpInterface } from '../types/interface';
import { createCoreContainer } from '../core/container';
import { createInfraContainer } from '../infrastructure/container';

type ContainerConfig = {
  env: any;
  init: {
    http?: boolean;
  };
};

type Container = {
  httpInterface?: IHttpInterface;
};

export default function createContainer(config: ContainerConfig): Container {
  const container: Container = {};

  const infraContainer = createInfraContainer();
  const coreContainer = createCoreContainer(infraContainer);

  if (config.init.http) {
    container.httpInterface = new HttpInterface({
      env: config.env,
      coreContainer,
    });
  }

  return container;
}
