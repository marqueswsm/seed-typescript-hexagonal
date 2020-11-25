import * as joi from 'joi';

export const createReferenceSchema = joi.object({
  body: {
    bibtex: joi.string().required(),
    citation: joi.string().required(),
    description: joi.string(),
  },
});
