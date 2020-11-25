import { ReferenceRepository } from './repository/reference';
import { MysqlAdapter } from './adapter/mysql';

import { Container } from '../types/infrastructure';

export function createInfraContainer(): Container {
  return {
    referenceRepository: new ReferenceRepository({
      mysqlAdapter: new MysqlAdapter(),
    }),
  };
}
