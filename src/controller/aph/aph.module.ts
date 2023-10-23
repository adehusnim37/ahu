import { Module } from "@nestjs/common";
import { APHController } from "./aph.controller";
import { APHService } from "./aph.service";
import {PrismaService} from "./prisma.service";


@Module({
  controllers: [APHController],
  providers: [APHService, PrismaService],
})
export class AphModule {}