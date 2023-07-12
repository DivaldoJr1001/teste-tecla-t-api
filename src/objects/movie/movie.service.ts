import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) { }

  async getAll(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async getById(id: string) {
    return await this.movieModel.findById(id).exec();
  }

  async create(movie: Movie) {
    const newMovie = new this.movieModel(movie);
    return await newMovie.save();
  }

  async update(id: string, movie: Movie) {
    return await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
    });
  }

  async delete(id: string) {
    await this.movieModel.findByIdAndRemove(id);
  }
}
