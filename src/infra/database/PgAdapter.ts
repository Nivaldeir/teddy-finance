import pg, { ITask } from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export class PgAdapter<T = unknown> implements DatabaseConnection<T> {
  private connection;
  constructor(connectionString: string) {
    this.connection = pg()(connectionString);
  }
  async rollback(callback: (db: ITask<{}>) => Promise<void>): Promise<void> {
    await this.connection.tx((e) => {
      callback(e);
    });
  }
  async query(sql: string, params?: any): Promise<T | T[]> {
    return this.connection.query(sql, params);
  }

  async close() {
    await this.connection.$pool.end();
  }
  async connect(): Promise<void> {
    await this.connection.connect();
  }
}
