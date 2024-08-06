// eslit-disable-next-line
import { Knex } from 'knex'

/* 
knex.d.ts -> definição de tipos (apenas typescript)
*/

declare module 'knex/types/tables' {
  export interface Tables {
    daily_users: {
      id: string;
      name: string;
      password: string;
      email: string;
      created_at: number;
      session_id: string;
    };
    daily_feed: {
      id: string;
      name: string;
      description: string;
      inDiet: boolean;
      created_at: string;
      updated_at: number;
      session_id: string;
      total?: number
    }
  }
}
