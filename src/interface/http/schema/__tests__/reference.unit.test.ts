import { Chance } from 'chance';

import { createReferenceSchema } from '../reference';

describe('Interface schema unit tests', () => {
  const chance = new Chance();

  describe('#createReferenceSchema', () => {
    it('should accept as a valid schema', () => {
      const referenceRequest = {
        body: {
          bibtex: chance.string(),
          description: chance.string(),
          citation: chance.string(),
        },
      };

      const { error } = createReferenceSchema.validate(referenceRequest);
      expect(error).toBeUndefined();
    });

    it('should accept as a valid schema without description', () => {
      const referenceRequest = {
        body: {
          bibtex: chance.string(),
          citation: chance.string(),
        },
      };

      const { error } = createReferenceSchema.validate(referenceRequest);
      expect(error).toBeUndefined();
    });

    it('should return error if bibtex is not sent', () => {
      const referenceRequest = {
        body: {
          description: chance.string(),
          citation: chance.string(),
        },
      };

      const { error } = createReferenceSchema.validate(referenceRequest);
      expect(error.message).toMatch('"body.bibtex" is required');
    });

    it('should return error if citation is not sent', () => {
      const referenceRequest = {
        body: {
          bibtex: chance.string(),
          description: chance.string(),
        },
      };

      const { error } = createReferenceSchema.validate(referenceRequest);
      expect(error.message).toMatch('"body.citation" is required');
    });
  });
});
