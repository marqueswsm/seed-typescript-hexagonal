import { Chance } from 'chance';

import { ReferenceUseCase } from '../reference';

describe('Reference use case unit tests', () => {
  const chance = new Chance();

  describe('#createNotification', () => {
    it('should call create from service with a valid body', async () => {
      const fakeContext = {
        referenceService: {
          createReference: jest.fn(),
        },
      };

      const referenceUseCase = new ReferenceUseCase(fakeContext);

      const reference = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      await referenceUseCase.createReference(reference);

      expect(fakeContext.referenceService.createReference)
        .toHaveBeenCalledWith(reference);
    });

    it('should return a valid response', async () => {
      const serviceResponse = {
        id: chance.guid({ version: 4 }),
      };

      const fakeContext = {
        referenceService: {
          createReference: jest.fn().mockResolvedValue(serviceResponse),
        },
      };

      const referenceUseCase = new ReferenceUseCase(fakeContext);

      const reference = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const response = await referenceUseCase.createReference(reference);

      expect(response).toEqual(serviceResponse);
    });
  });
});
