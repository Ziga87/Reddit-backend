import { ApiProperty, PartialType } from '@nestjs/swagger';
import { VoteCreateDto } from "./CreateVoteDto";

export class VoteUpdateDto extends PartialType(VoteCreateDto) {
  @ApiProperty({ example: 1, description: 'The value of the vote (e.g., 1 for upvote, -1 for downvote)', required: false })
  value?: number;
}
