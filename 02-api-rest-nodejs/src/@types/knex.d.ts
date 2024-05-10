// knex.d.ts => não terá código js, apenas typescript (definição de tipos)

/* 
tipos inferidos: aumentar interface Tables no módulo 'knex/types/tables'.
reduzir a quantidade de código necessário para trabalhar com tabelas (menos código repetitivo e mais eficiência no desenvolvimento)

*/

// ignorar a próxima linha (reaproveitar os tipos knex):
// eslint-disable-next-line
import { Knex } from "knex";

// obter módulo
declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string;
      title: string;
      amount: number;
      created_at: string;
      session_id?: string;
    };
  }
}
