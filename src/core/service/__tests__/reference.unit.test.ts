import { Chance } from 'chance';

import { ReferenceService } from '../reference';

describe('Service reference unit tests', () => {
  const chance = new Chance();

  describe('#createReference', () => {
    it('it should call create reference from repository with a valid body', async () => {
      const fakeContext = {
        referenceRepository: {
          createReference: jest.fn(),
        },
      };

      const referenceService = new ReferenceService(fakeContext);

      const reference = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      await referenceService.createReference(reference);

      expect(fakeContext.referenceRepository.createReference).toHaveBeenCalledWith(reference);
    });

    it('it should return a valid response', async () => {
      const repositoryResponse = {
        id: chance.guid({ version: 4 }),
      };

      const fakeContext = {
        referenceRepository: {
          createReference: jest.fn().mockResolvedValue(repositoryResponse),
        },
      };

      const referenceService = new ReferenceService(fakeContext);

      const reference = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const response = await referenceService.createReference(reference);

      expect(response).toEqual(repositoryResponse);
    });
  });
});
