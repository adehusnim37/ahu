import { Module } from '@nestjs/common';
import { AphModule } from "./pemeriksaanAPH/user.module";

@Module({
  imports: [AphModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
