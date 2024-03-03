import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  // recipes:Recipes[]=[
  //   new Recipes('A test recipe1', 'This is simply a test1','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
  //   new Recipes('A test recipe2', 'This is simply a test2','https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg')
  // ];

// @Output() onRecipeFromList = new EventEmitter<Recipes>()

  // onRecipeSelectedList(recipeFromList:Recipes){
  //  this.onRecipeFromList.emit(recipeFromList);
  // }

  recipesList:Recipes[]
  recipeSubscription:Subscription
  constructor(private recipeService:RecipeService, private router:Router, private activeRoute:ActivatedRoute){}

  
  ngOnInit(): void {
   this.recipeSubscription= this.recipeService.recipeChanges.subscribe(
      (recipesNew:Recipes[])=>{
        this.recipesList=recipesNew
      }
    )
   this.recipesList= this.recipeService.getRecipeList();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.activeRoute})
  }

  
}

