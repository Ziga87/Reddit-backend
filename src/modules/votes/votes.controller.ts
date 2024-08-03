import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote as VoteModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VoteCreateDto } from "./dtos/CreateVoteDto";
import { VoteUpdateDto } from "./dtos/UpdateVoteDto";


@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vote' })
  @ApiResponse({ status: 201, description: 'The vote has been successfully created.' })
  @ApiBody({ description: 'The vote data', type: VoteCreateDto })
  async createVote(@Body() voteData: VoteCreateDto): Promise<VoteModel> {
    return this.votesService.createVote(voteData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vote by ID' })
  @ApiResponse({ status: 200, description: 'The vote has been successfully retrieved.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the vote to retrieve' })
  async getVoteById(@Param('id', ParseIntPipe) voteId: number): Promise<VoteModel> {
    return this.votesService.getVoteById(voteId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vote by ID' })
  @ApiResponse({ status: 200, description: 'The vote has been successfully updated.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the vote to update' })
  @ApiBody({ description: 'The vote update data', type: VoteUpdateDto })
  async updateVoteById(@Param('id', ParseIntPipe) voteId: number, @Body() updateData: VoteUpdateDto): Promise<VoteModel> {
    return this.votesService.updateVoteById(voteId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vote by ID' })
  @ApiResponse({ status: 200, description: 'The vote has been successfully deleted.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the vote to delete' })
  async deleteVoteById(@Param('id', ParseIntPipe) voteId: number): Promise<VoteModel> {
    return this.votesService.deleteVoteById(voteId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all votes' })
  @ApiResponse({ status: 200, description: 'The votes have been successfully retrieved.' })
  async getAllVotes(): Promise<VoteModel[]> {
    return this.votesService.getAllVotes();
  }
}
