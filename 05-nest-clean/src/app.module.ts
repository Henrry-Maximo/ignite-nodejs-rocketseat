import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/*

- Module: is responsible by controllers, configurations, connection database merged in only a file,
and the module is imported in the main.ts
  - All the modules are a class empty (but have somethings)

*/

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
