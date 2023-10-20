import { Module } from "@nestjs/common";
import { APHController } from "./example.controller";
import { APHService } from "./example.service";
import {PrismaService} from "./prisma.service";


@Module({
  controllers: [APHController],
  providers: [APHService, PrismaService],
})
export class AphModule {}