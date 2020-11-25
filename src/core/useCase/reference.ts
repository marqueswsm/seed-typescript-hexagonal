import { UseCaseContext } from "../../types/core";
import { IReferenceUseCase, Reference } from "../../types/reference";

export class ReferenceUseCase implements IReferenceUseCase {
  private referenceService: UseCaseContext['referenceService'];

  constructor(ctx: UseCaseContext) {
    this.referenceService = ctx.referenceService;
  }

  createReference(params: Reference): Promise<Reference['id']> {
    return this.referenceService.createReference(params);
  }
}