import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  createUser(dto: CreateUserDto) {
    const user = this.userRepository.create({
      username: dto.username,
      bio: dto.bio,
      followers: dto.followers ?? 0,
    });

    return this.userRepository.save(user);
  }

  findAllUsers() {
    return this.userRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = this.postRepository.create({
      caption: dto.caption,
      likes: dto.likes ?? 0,
      user,
    });

    return this.postRepository.save(post);
  }

  findPostsByUser(userId: number) {
    return this.postRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        comments: true,
      },
    });
  }
}
