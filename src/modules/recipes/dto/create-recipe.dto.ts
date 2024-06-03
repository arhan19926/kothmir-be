export class CreateRecipeDto {
  id: string;

  name: string;

  description: string;

  imageUrl: string;

  date: Date;

  veg: boolean;

  origin: string;
}
