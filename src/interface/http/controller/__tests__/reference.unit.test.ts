import { Chance } from 'chance';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import { ReferenceController } from '../reference';

describe('Controller reference unit tests', () => {
  const chance = new Chance();
  describe('#createReference', () => {
    it('should call use case to create reference with a valid body', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const bodyRequest = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const coreContainer = {
        referenceUseCase: {
          createReference: jest.fn(),
        },
      };

      req.setBody(bodyRequest);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const controller = new ReferenceController({ coreContainer, validator });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await controller.createReference(req, res, next);

      expect(coreContainer.referenceUseCase.createReference).toHaveBeenCalledWith(bodyRequest);
    });    

    it('should call with 201', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const bodyRequest = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const coreContainer = {
        referenceUseCase: {
          createReference: jest.fn().mockResolvedValue({
            id: chance.guid({ version: 4 }),
          }),
        },
      };

      req.setBody(bodyRequest);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const controller = new ReferenceController({ coreContainer, validator });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await controller.createReference(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });    

    it('should call send with a valid body', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const bodyRequest = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const useCaseResponse = {
        id: chance.guid({ version: 4 }),
      };

      const coreContainer = {
        referenceUseCase: {
          createReference: jest.fn().mockResolvedValue(useCaseResponse),
        },
      };

      req.setBody(bodyRequest);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const controller = new ReferenceController({ coreContainer, validator });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await controller.createReference(req, res, next);

      expect(res.send).toHaveBeenCalledWith(useCaseResponse);
    });    

    it('should call next if use case throws', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const bodyRequest = {
        bibtex: chance.string(),
        description: chance.string(),
        citation: chance.string(),
      };

      const useCaseResponse = {
        id: chance.guid({ guid: 4 }),
      };

      const coreContainer = {
        referenceUseCase: {
          createReference: jest.fn(() => {
            throw new Error('Some error');
          }),
        },
      };

      req.setBody(bodyRequest);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const controller = new ReferenceController({ coreContainer, validator });
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await controller.createReference(req, res, next);

      expect(next).toHaveBeenCalled();
    });    
  });
});
