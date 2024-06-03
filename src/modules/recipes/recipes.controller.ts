import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '@app/src/modules/recipes/dto/create-recipe.dto';
import { ApiResponse } from '@app/utils/helpers/response-context.helper';
import { STATUS_CODES } from '@app/utils/constants/status-codes.constant';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('/')
  async findAll() {
    try {
      const result = await this.recipesService.findAll();
      return new ApiResponse(result, null, STATUS_CODES.OK);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto[]) {
    try {
      const result = this.recipesService.processCreateRecipes(createRecipeDto);
      return new ApiResponse(result, null, STATUS_CODES.CREATED);
    } catch (error) {
      throw error;
    }
  }
}
