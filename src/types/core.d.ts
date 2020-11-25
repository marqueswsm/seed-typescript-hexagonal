import { Container as infraContainer } from './infrastructure';

import { IReferenceService, IReferenceUseCase } from './reference';

export type ContainerConfig = {
  referenceRepository: infraContainer['referenceRepository'];
};

export type ServiceContext = {
  referenceRepository: ContainerConfig['referenceRepository'];
};

export type Container = {
  referenceUseCase: IReferenceUseCase;
};

export type UseCaseContext = {
  referenceService: IReferenceService;
};
