import { Component, Input} from '@angular/core';
import { Recipes } from '../recipes.model';
import { ShoppinglistService } from 'src/app/services/shoppingList.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {

  recipeDetail:Recipes;
  id:number

  constructor(private recipeService:RecipeService,private activateRoute:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (para:Params)=>{
        this.id = +para['id'];
        this.recipeDetail= this.recipeService.getRecipesDetail(this.id)
      }
    )
  }

  ingredToShopList(){
    this.recipeService.addIngredToShopList(this.recipeDetail.ingrediants);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activateRoute})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }

}
