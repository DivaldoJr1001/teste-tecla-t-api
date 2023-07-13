import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieLikes, MovieLikesDocument } from './movie-likes.schema';

@Injectable()
export class MovieLikesService {
  constructor(
    @InjectModel(MovieLikes.name) private movieLikesModel: Model<MovieLikesDocument>,
  ) {
    movieLikesModel.createCollection({
      viewOn: 'Movies',
      pipeline: [
        {
          $sort: {
            likes_count: -1
          }
        }
      ]
    });
  }

  async get(): Promise<MovieLikes[]> {
    return await this.movieLikesModel.find().exec();
  }
}
