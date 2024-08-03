import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDto {
  @ApiProperty({ example: 'Post Title', description: 'The title of the post' })
  title: string;

  @ApiProperty({ example: 'Post content...', description: 'The content of the post' })
  content: string;

  @ApiProperty({ example: '123', description: 'The ID of the author' })
  authorId: string;
}
