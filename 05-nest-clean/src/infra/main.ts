import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./env/env-service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // { logger: false }

  // const configService: ConfigService<Env> = app.get(ConfigService);
  // const configService = app.get(ConfigService) as ConfigService<Env>;
  // const configService = app.get<ConfigService<Env, true>>(ConfigService);
  // const port = configService.get('PORT', { infer: true });

  const envService = app.get(EnvService);
  const port = envService.get("PORT");

  await app.listen(port);
}
bootstrap();
