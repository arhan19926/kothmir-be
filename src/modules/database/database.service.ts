import {
  Recipes,
  RecipesDocument,
} from '@app/src/modules/recipes/schema/recipe.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Recipes.name) private recipesModel: Model<RecipesDocument>,
  ) {}

  async insertOrUpdateData(data: any) {
    try {
      const filter = { id: data.id };

      const update = data;
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await this.recipesModel.findOneAndUpdate(filter, update, options).exec();
      console.log(`Mongo Upsert complete`);
    } catch (error) {
      console.error('Error inserting data In Mongo:', error.message);
      throw error;
    }
  }

  async getData(filter?: any) {
    try {
      if (filter?.id) {
        const result = await this.recipesModel.find({ id: filter.id });
        return result;
      }
      const result = await this.recipesModel.find();
      return result;
    } catch (error) {
      console.log(error);
      console.log(`Error Fetching data from Mongo Collection`);
    }
  }
}
