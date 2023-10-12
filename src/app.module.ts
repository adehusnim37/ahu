import { Module } from '@nestjs/common';
import { AphModule } from "./user/user.module";

@Module({
  imports: [AphModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
