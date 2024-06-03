import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type RecipesDocument = HydratedDocument<Recipes>;

@Schema({ collection: 'recipes' })
export class Recipes extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  date: Date;

  @Prop()
  veg: boolean;

  @Prop()
  origin: string;
}

export const RecipesSchema = SchemaFactory.createForClass(Recipes);
