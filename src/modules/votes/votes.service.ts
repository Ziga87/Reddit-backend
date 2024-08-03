import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Vote, Prisma } from '@prisma/client';
import { VoteCreateDto } from "./dtos/CreateVoteDto";
import { VoteUpdateDto } from "./dtos/UpdateVoteDto";


@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async createVote(data: VoteCreateDto): Promise<Vote> {
    const { value, userId, postId, commentId } = data;
    if (!value || !userId || (!postId && !commentId)) {
      throw new BadRequestException('Missing required fields');
    }

    return this.prisma.vote.create({
      data: {
        value,
        user: { connect: { id: userId } },
        post: postId ? { connect: { id: Number(postId) } } : undefined,
        comment: commentId ? { connect: { id: Number(commentId) } } : undefined,
      },
    });
  }

  async getVoteById(voteId: number): Promise<Vote> {
    const vote = await this.prisma.vote.findUnique({ where: { id: voteId } });
    if (!vote) {
      throw new NotFoundException('Vote not found');
    }
    return vote;
  }

  async updateVoteById(voteId: number, updateData: VoteUpdateDto): Promise<Vote> {
    const vote = await this.prisma.vote.findUnique({ where: { id: voteId } });
    if (!vote) {
      throw new NotFoundException('Vote not found');
    }

    const updatePayload: Prisma.VoteUpdateInput = {
      value: updateData.value,
      user: updateData.userId ? { connect: { id: updateData.userId } } : undefined,
      post: updateData.postId ? { connect: { id: Number(updateData.postId) } } : undefined,
      comment: updateData.commentId ? { connect: { id: Number(updateData.commentId) } } : undefined,
    };

    return this.prisma.vote.update({
      where: { id: voteId },
      data: updatePayload,
    });
  }

  async deleteVoteById(voteId: number): Promise<Vote> {
    const vote = await this.prisma.vote.findUnique({ where: { id: voteId } });
    if (!vote) {
      throw new NotFoundException('Vote not found');
    }
    return this.prisma.vote.delete({
      where: { id: voteId },
    });
  }

  async getAllVotes(): Promise<Vote[]> {
    return this.prisma.vote.findMany();
  }
}
