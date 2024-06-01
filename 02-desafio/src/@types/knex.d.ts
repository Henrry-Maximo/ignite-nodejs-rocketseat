import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    user: {
      id: number,
      name: string,
      password: string,
      created_at: string
    }
  };
}