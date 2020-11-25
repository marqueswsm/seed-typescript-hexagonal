import { ServiceContext } from '../../types/core';

import { IReferenceService, Reference } from '../../types/reference';

export class ReferenceService implements IReferenceService {
  private referenceRepository: ServiceContext['referenceRepository'];

  constructor(context: ServiceContext) {
    this.referenceRepository = context.referenceRepository;
  }

  createReference(params: Omit<Reference, 'id'>): Promise<Pick<Reference, 'id'>> {
    return this.referenceRepository.createReference(params);
  }
}
