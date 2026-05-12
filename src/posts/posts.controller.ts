import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { PostsService } from './posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
@UseGuards(ApiKeyGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/comments')
  createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.postsService.createComment(id, dto);
  }
}
