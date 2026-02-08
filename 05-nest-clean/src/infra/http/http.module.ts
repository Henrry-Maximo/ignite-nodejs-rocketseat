import { Module } from "@nestjs/common";

import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { DatabaseModule } from "../database/prisma/database.module";


@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateAccountController,
    FetchRecentQuestionsController,
  ],
  // providers: [
  //   PrismaService
  // ]
})

export class HttpModule {}