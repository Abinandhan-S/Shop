import { EventEmitter, Injectable } from "@angular/core";
import { Recipes } from "../recipes/recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppinglistService } from "./shoppingList.service";
import { Subject } from "rxjs";

@Injectable()

export class RecipeService{


    // recipeSelected=new Subject<Recipes>();

    // onRecipe(recipeProperty:Recipes){
    //     this.recipeSelected.next(recipeProperty);
    //     console.log('2nd Execution:');
    //     console.log(recipeProperty);
        
    // }
    
    recipeChanges= new Subject<Recipes[]>();

    private recipes:Recipes[]=[
        new Recipes(
            'A test recipe1', 
            'This is simply a test1', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('Bun',6),
                new Ingredient('Butter',7)
            ]),
        new Recipes(
            'A test recipe2', 
            'This is simply a test2', 
            'https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg',
            [
                new Ingredient('vegetable',5),
                new Ingredient('Spicy chause',4)
            ])
    ];

    constructor(private shopListService:ShoppinglistService){}

    getRecipeList(){
        return this.recipes.slice();
    }

    getRecipesDetail(index:number){
        return this.recipes.slice()[index];
    }

    addIngredToShopList(ingred:Ingredient[]){
        this.shopListService.ingredToShopList(ingred);
    }

    addRecipe(newRecipes:Recipes){
        this.recipes.push(newRecipes);
        this.recipeChanges.next(this.recipes)
    }

    updateRecipe(index:number,newRecipes:Recipes){
        this.recipes[index]=newRecipes;
        this.recipeChanges.next(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipeChanges.next(this.recipes.slice())
    }

}