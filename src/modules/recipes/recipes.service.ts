import { CreateRecipeDto } from '@app/src/modules/recipes/dto/create-recipe.dto';
import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      const result = await this.databaseService.getData();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async processCreateRecipes(payload: CreateRecipeDto[]) {
    try {
      for (const recipe of payload) {
        recipe.id = uuidv4();
      }
      const result = await this.databaseService.insertOrUpdateData(payload);
      return result;
    } catch (error) {
      console.log(`Error In processCreateRecipes`);
      throw error;
    }
  }
}
