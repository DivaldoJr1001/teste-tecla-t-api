import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieLikesSchema } from './movie-likes.schema';
import { MovieLikesService } from './movie-likes.service';
import { MovieLikesController } from './movie-likes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MovieLikes',
        schema: MovieLikesSchema,
        collection: 'MoviesLikes',
      },
    ]),
  ],
  providers: [MovieLikesService],
  exports: [MovieLikesService],
  controllers: [MovieLikesController],
})
export class MovieLikesModule { }
