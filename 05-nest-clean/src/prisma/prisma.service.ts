import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client/extension'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /* 
  ### Opção 1:
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
  */

  // ### Opção 2:
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  // para serviços extenos
  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }

  // teste() {
  //   return "oi";
  // }
}
