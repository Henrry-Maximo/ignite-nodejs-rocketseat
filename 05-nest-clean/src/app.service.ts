import { Injectable } from '@nestjs/common';

/* 

- Service: it's available for will be injection in
others classes (controllers, providers, etc)
- It's a class that have some business rules
- It's a class that not have HTTP,then is Service

*/

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
