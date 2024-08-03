import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
  @ApiProperty({ example: 'Comment content...', description: 'The content of the comment' })
  content: string;

  @ApiProperty({ example: '1f73dd61-39bb-422b-8bd7-c4a576d2c0d6', description: 'The ID of the author' })
  authorId: string;

  @ApiProperty({ example: 1, description: 'The ID of the post', required: false })
  postId?: number;

  @ApiProperty({ example: 1, description: 'The ID of the parent comment', required: false })
  parentId?: number;
}
