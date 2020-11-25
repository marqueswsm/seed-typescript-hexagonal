import knex from 'knex';

import { IReferenceRepository } from './reference';

/* MySQL Adapter */
export type MysqlDatabase = knex;

export type MysqlAdapterConfig = {
  dbConn: MysqlDatabase;
};

export interface IMysqlAdapter {
  db: knex.QueryBuilder;
  tableName: string;
}

export type Container = {
  referenceRepository: IReferenceRepository;
};
