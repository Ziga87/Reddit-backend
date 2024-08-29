import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote as VoteModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VoteCreateDto } from "./dtos/CreateVoteDto";

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a vote' })
  @ApiResponse({ status: 201, description: 'The vote has been successfully created or updated.' })
  @ApiBody({ description: 'The vote data', type: VoteCreateDto })
  async createOrUpdateVote(@Body() voteData: VoteCreateDto): Promise<{ upvotes: number }> {
    await this.votesService.createOrUpdateVote(voteData);
    const { postId } = voteData;
    return this.votesService.getVotesByPostId(postId);
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get votes by Post ID' })
  @ApiResponse({ status: 200, description: 'The votes have been successfully retrieved.' })
  @ApiParam({ name: 'postId', required: true, description: 'ID of the post to retrieve votes for' })
  async getVotesByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<{ upvotes: number }> {
    return this.votesService.getVotesByPostId(postId);
  }
}
