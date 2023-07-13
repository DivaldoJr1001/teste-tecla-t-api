import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieLikesDocument = HydratedDocument<MovieLikes>;

@Schema({ collection: 'MoviesLikes', autoCreate: false })
export class MovieLikes {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  adult: boolean;

  @Prop({ required: true })
  backdrop_path: string;

  @Prop({ required: true })
  genres: string[];

  @Prop({ required: true })
  original_language: string;

  @Prop({ required: true })
  original_title: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  popularity: number;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  video: boolean;

  @Prop({ required: true })
  likes_count: number;
}

export const MovieLikesSchema = SchemaFactory.createForClass(MovieLikes);
