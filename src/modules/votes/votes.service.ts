import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Vote, Prisma } from '@prisma/client';
import { VoteCreateDto } from "./dtos/CreateVoteDto";
import { VoteUpdateDto } from './dtos/UpdateVoteDto';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateVote(data: VoteCreateDto): Promise<{ upvotes: number }> {
    const { value, userId, postId, commentId } = data;
    if (value === undefined || value === null || !userId || (!postId && !commentId)) {
      throw new BadRequestException('Missing required fields');
    }

    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    // Check if a vote by this user for this post or comment already exists
    const existingVote = await this.prisma.vote.findFirst({
      where: {
        userId,
        postId: postId ? Number(postId) : undefined,
        commentId: commentId ? Number(commentId) : undefined,
      },
    });

    if (existingVote) {
      if (existingVote.value === value) {
        throw new ForbiddenException('You cannot vote the same way twice');
      }

      // Update the existing vote
      await this.prisma.vote.update({
        where: { id: existingVote.id },
        data: { value },
      });
    } else {
      // Create a new vote
      await this.prisma.vote.create({
        data: {
          value,
          user: { connect: { id: userId } },
          post: postId ? { connect: { id: Number(postId) } } : undefined,
          comment: commentId ? { connect: { id: Number(commentId) } } : undefined,
        },
      });
    }

    return this.getVotesByPostId(postId);
  }

  async getVotesByPostId(postId: number): Promise<{ upvotes: number }> {
    const votes = await this.prisma.vote.findMany({
      where: { postId },
    });

    const upvotes = votes.reduce((acc, vote) => acc + vote.value, 0);
    return { upvotes };
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
