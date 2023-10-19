import { Module } from "@nestjs/common";
import { APHController } from "./user.controller";
import { APHService } from "./user.service";
import {PrismaService} from "./prisma.service";


@Module({
  controllers: [APHController],
  providers: [APHService, PrismaService],
})
export class AphModule {}