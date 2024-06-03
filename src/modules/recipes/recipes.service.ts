import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {
  findAll() {
    return `This action returns all recipes`;
  }
}
