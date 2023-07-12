import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopTenListDocument = HydratedDocument<TopTenList>;

@Schema({ collection: 'TopTenList' })
export class TopTenList {
  @Prop()
  _id?: string;

  @Prop({ required: true })
  topTenMovies: string[];
}

export const TopTenListSchema = SchemaFactory.createForClass(TopTenList);
