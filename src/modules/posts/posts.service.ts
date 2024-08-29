import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Post } from '@prisma/client';
import { PostCreateDto } from './dtos/PostCreateDto';
import { PostUpdateDto } from './dtos/PostUpdateDto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: PostCreateDto): Promise<Post> {
    const { title, content, authorId } = data;
    if (!title || !content || !authorId) {
      throw new BadRequestException('Missing required fields');
    }
    return this.prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
      },
    });
  }

  async getPostById(postId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePostById(
    postId: number,
    updateData: PostUpdateDto,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const { title, content, authorId } = updateData;
    return this.prisma.post.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(authorId && { author: { connect: { id: authorId } } }),
      },
    });
  }

  async deletePostById(postId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.prisma.post.delete({
      where: { id: postId },
    });
  }

  async getAllPosts(): Promise<any[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // You can change 'createdAt' to any other field you want to order by
      },
    });
  }
}
