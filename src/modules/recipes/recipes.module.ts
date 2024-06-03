import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { DatabaseModule } from '@app/src/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
