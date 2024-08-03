import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment as CommentModel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CommentCreateDto } from "./dtos/CommentCreateDto";
import { CommentUpdateDto } from "./dtos/CommentUpdateDto";

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiBody({ description: 'The comment data', type: CommentCreateDto })
  async createComment(@Body() commentData: CommentCreateDto): Promise<CommentModel> {
    return this.commentsService.createComment(commentData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully retrieved.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the comment to retrieve' })
  async getCommentById(@Param('id', ParseIntPipe) commentId: number): Promise<CommentModel> {
    return this.commentsService.getCommentById(commentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully updated.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the comment to update' })
  @ApiBody({ description: 'The comment update data', type: CommentUpdateDto })
  async updateCommentById(@Param('id', ParseIntPipe) commentId: number, @Body() updateData: CommentUpdateDto): Promise<CommentModel> {
    return this.commentsService.updateCommentById(commentId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the comment to delete' })
  async deleteCommentById(@Param('id', ParseIntPipe) commentId: number): Promise<CommentModel> {
    return this.commentsService.deleteCommentById(commentId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'The comments have been successfully retrieved.' })
  async getAllComments(): Promise<CommentModel[]> {
    return this.commentsService.getAllComments();
  }
}
