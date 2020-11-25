import database from '../../util/knex';

import {
  MysqlDatabase,
  IMysqlAdapter,
  MysqlAdapterConfig,
} from '../../types/infrastructure';

export class MysqlAdapter implements IMysqlAdapter {
  private tabName: string;

  private database: MysqlDatabase;

  constructor(config?: MysqlAdapterConfig) {
    this.database = config?.dbConn || database();
    this.tabName = '';
  }

  get db() {
    return this.database(this.tabName);
  }

  set tableName(name: string) {
    this.tabName = name;
  }
}
