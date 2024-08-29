import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PostCreateDto } from './dtos/PostCreateDto';
import { PostUpdateDto } from './dtos/PostUpdateDto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiBody({ description: 'The post data', type: PostCreateDto })
  async createPost(@Body() postData: PostCreateDto): Promise<PostModel> {
    return this.postsService.createPost(postData);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully retrieved.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the post to retrieve',
  })
  async getPostById(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostModel> {
    return this.postsService.getPostById(postId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the post to update',
  })
  @ApiBody({ description: 'The post update data', type: PostUpdateDto })
  async updatePostById(
    @Param('id', ParseIntPipe) postId: number,
    @Body() updateData: PostUpdateDto,
  ): Promise<PostModel> {
    return this.postsService.updatePostById(postId, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the post to delete',
  })
  async deletePostById(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostModel> {
    return this.postsService.deletePostById(postId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'The posts have been successfully retrieved.',
  })
  async getAllPosts(): Promise<any[]> {
    const posts = await this.postsService.getAllPosts();
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author.username,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }
}
