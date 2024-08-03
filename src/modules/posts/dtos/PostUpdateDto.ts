import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PostCreateDto } from "./PostCreateDto";

export class PostUpdateDto extends PartialType(PostCreateDto) {
  @ApiProperty({ example: 'Post Title', description: 'The title of the post', required: false })
  title?: string;

  @ApiProperty({ example: 'Post content...', description: 'The content of the post', required: false })
  content?: string;

  @ApiProperty({ example: '123', description: 'The ID of the author', required: false })
  authorId?: string;
}
