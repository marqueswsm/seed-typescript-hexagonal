/* eslint-disable no-unused-vars */

export type Reference = {
  id: string;
  bibtex: string;
  citation: string;
  description: string;
};

export interface IReferenceRepository {
  createReference(params: Omit<Reference, 'id'>): Promise<Pick<Reference, 'id'>>;
}

export interface IReferenceService {
  createReference(params: Omit<Reference, 'id'>): Promise<Pick<Reference, 'id'>>;
}

export interface IReferenceUseCase {
  createReference(params: Omit<Reference, 'id'>): Promise<Pick<Reference, 'id'>>;
}
