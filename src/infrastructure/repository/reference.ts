import * as Uuid from 'uuid-converter';
import * as R from 'ramda';

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
    this.mysqlAdapter.tableName = 'references';
  }
  
  async createReference(params: Reference): Promise<Pick<Reference, 'id'>> {
    const id = Uuid.generate();

    const reference = R.assoc('id', id, params);

    await this.mysqlAdapter.db.insert(reference);

    return {
      id,
    };
  }
}
