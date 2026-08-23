import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'

/*

- Module: is responsible by controllers, configurations, connection database merged in only a file,
and the module is imported in the main.ts
  - All the modules are a class empty (but have somethings)

*/

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule, // app conheça as variáveis de ambiente
  ],
  // providers: [EnvService]
  // controllers: [
  //   CreateAccountController,
  //   AuthenticateController,
  //   CreateAccountController,
  //   FetchRecentQuestionsController,
  // ],
  // providers: [PrismaService],
})
export class AppModule {}
