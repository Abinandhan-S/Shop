import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipes } from '../../recipes.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit{

  // @Output() recipeSelected =new EventEmitter<void>()
  
  // onClickRecipeItem(){
  //   // this.recipeSelected.emit();
  //   // this.recipeService.recipeSelected.emit(this.recipeProperty);
  //   // console.log('RecipeProperty: '+this.recipeProperty);
  //   this.recipeService.onRecipe(this.recipeProperty);
  //   console.log('3rd Execution:');
  //   console.log(this.recipeProperty);

  // }
  
    
  @Input() recipeProperty : Recipes
  @Input() index:number
 
  constructor(private recipeService:RecipeService){}
  ngOnInit(): void {}


  

}
