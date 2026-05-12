import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('users')
@UseGuards(ApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Post(':id/posts')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePostDto,
  ) {
    return this.usersService.createPost(id, dto);
  }

  @Get(':id/posts')
  findPostsByUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findPostsByUser(id);
  }
}
