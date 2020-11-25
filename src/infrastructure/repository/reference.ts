import { IReferenceRepository, Reference } from '../../types/reference';
import {
  IMysqlAdapter,
} from '../../types/infrastructure';

type Context = {
  mysqlAdapter: IMysqlAdapter,
};

export class ReferenceRepository implements IReferenceRepository {
  private mysqlAdapter: Context['mysqlAdapter'];

  constructor(context: Context) {
    this.mysqlAdapter = context.mysqlAdapter;
  }
  
  createReference(params: Reference): Promise<string> {
    return Promise.resolve('Mutual <3');
  }
}
