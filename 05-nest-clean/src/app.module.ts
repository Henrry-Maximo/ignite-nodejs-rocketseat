import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account-controller'

/*

- Module: is responsible by controllers, configurations, connection database merged in only a file,
and the module is imported in the main.ts
  - All the modules are a class empty (but have somethings)

*/

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
