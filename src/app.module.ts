import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
