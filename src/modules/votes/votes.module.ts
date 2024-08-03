import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [VotesService, PrismaService],
  controllers: [VotesController],
})
export class VotesModule {}
