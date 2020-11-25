import { ReferenceUseCase } from './useCase/reference';

import { Container, ContainerConfig } from '../types/core';
import { ReferenceService } from './service/reference';

export function createCoreContainer(config: ContainerConfig): Container {
  const serviceContext = {
    referenceRepository: config.referenceRepository,
  };
  const useCaseContext = {
    referenceService: new ReferenceService(serviceContext),
  };

  return {
    referenceUseCase: new ReferenceUseCase(useCaseContext),
  };
}
