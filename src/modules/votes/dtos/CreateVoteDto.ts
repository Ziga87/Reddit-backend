import { ApiProperty } from '@nestjs/swagger';

export class VoteCreateDto {
  @ApiProperty({ example: 1, description: 'The value of the vote (e.g., 1 for upvote, -1 for downvote)' })
  value: number;

  @ApiProperty({ example: 1, description: 'The ID of the post', required: false })
  postId?: number;

  @ApiProperty({ example: 1, description: 'The ID of the comment', required: false })
  commentId?: number;

  @ApiProperty({ example: '1f73dd61-39bb-422b-8bd7-c4a576d2c0d6', description: 'The ID of the user' })
  userId: string;
}
