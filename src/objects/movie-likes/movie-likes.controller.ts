import { Controller, Get } from '@nestjs/common';
import { MovieLikesService } from './movie-likes.service';

@Controller('moviesLikes')
export class MovieLikesController {

  constructor(private movieLikesService: MovieLikesService) { }

  @Get()
  async get() {
    return await this.movieLikesService.get();
  }
}
