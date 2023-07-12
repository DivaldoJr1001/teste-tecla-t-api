import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({collection:'Movies'})
export class Movie {
  @Prop()
  _id: string;

  @Prop()
  adult: boolean;

  @Prop()
  backdrop_path: string;

  @Prop()
  genres: string[];

  @Prop()
  original_language: string;

  @Prop()
  original_title: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  poster_path: string;

  @Prop()
  release_date: string;

  @Prop()
  title: string;

  @Prop()
  video: boolean;

  @Prop()
  likes_count: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
