import { Chance } from 'chance';

import { ReferenceRepository } from '../reference';

describe('Repository reference unit tests', () => {
  const chance = new Chance();

  describe('#createReference', () => {
    it('should call insert with a valid body', async () => {
      const fakeDatabase = {
        mysqlAdapter: {
          db: {
            insert: jest.fn(),
          },
        },
      };

      // @ts-ignore
      const referenceRepository = new ReferenceRepository(fakeDatabase);

      const reference = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      await referenceRepository.createReference(reference);

      expect(fakeDatabase.mysqlAdapter.db.insert).toHaveBeenCalledWith(
        expect.objectContaining(reference),
      );
    });
  });
});
