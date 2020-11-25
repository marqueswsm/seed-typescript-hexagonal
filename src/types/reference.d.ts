export type Reference = {
  id: string;
  bibtex: string;
  citation: string;
  description: string;
};

export interface IReferenceRepository {
  createReference(params: Reference): Promise<Reference['id']>
}

export interface IReferenceService {
  createReference(params: Reference): Promise<Reference['id']>;
}

export interface IReferenceUseCase {
  createReference(params: Reference): Promise<Reference['id']>;
}
  