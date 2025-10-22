import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

/*

- Decorator: is a function, receive something and return modify (behavior)
- Decorator @Controller: specific that the class have methods that are routes
- Decorator @Get: specific that the method is a route

*/

@Controller('/api')
export class AppController {
  // Controller use SOLID Pattern (Inversion Dependencie)
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello()
  }
}
