import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Comment, Prisma } from '@prisma/client';
import { CommentCreateDto } from "./dtos/CommentCreateDto";
import { CommentUpdateDto } from "./dtos/CommentUpdateDto";


@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: CommentCreateDto): Promise<Comment> {
    const { content, authorId, postId, parentId } = data;
    if (!content || !authorId || (!postId && !parentId)) {
      throw new BadRequestException('Missing required fields');
    }

    return this.prisma.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        post: postId ? { connect: { id: Number(postId) } } : undefined,
        parent: parentId ? { connect: { id: Number(parentId) } } : undefined,
      },
    });
  }

  async getCommentById(commentId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async updateCommentById(commentId: number, updateData: CommentUpdateDto): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const updatePayload: Prisma.CommentUpdateInput = {
      content: updateData.content,
      author: updateData.authorId ? { connect: { id: updateData.authorId } } : undefined,
      post: updateData.postId ? { connect: { id: Number(updateData.postId) } } : undefined,
      parent: updateData.parentId ? { connect: { id: Number(updateData.parentId) } } : undefined,
    };

    return this.prisma.comment.update({
      where: { id: commentId },
      data: updatePayload,
    });
  }

  async deleteCommentById(commentId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  async getAllComments(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }
}
