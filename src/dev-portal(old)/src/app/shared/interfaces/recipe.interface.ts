export interface Recipe {
    recipeId: number;
    author: string;
    name: string;
    description: string;
    prep_time: number;
    rating: number;
    ingrediants: {}[];
}
