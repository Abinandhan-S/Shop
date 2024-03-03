import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id:number;
  editmode=false
  recipeForm:FormGroup

  constructor(private activeRouter:ActivatedRoute, private recipeService:RecipeService, private router:Router){}

  ngOnInit(): void {

    this.activeRouter.params.subscribe(
      (para:Params)=>{
        this.id = +para['id'];
        this.editmode = para['id']!=null;
        this.initForm()
        console.log("editMode: "+this.editmode);
        
      }
    )
  }

  private initForm(){
    let recipeName=''
    let recipeImgPath=''
    let description=''
    let recipeIngrediants= new FormArray([])

    if(this.editmode){

      const recipe= this.recipeService.getRecipesDetail(this.id)

      recipeName=recipe.name
      recipeImgPath=recipe.imagePath
      description=recipe.description

      // different thing to get a value
      // recipeName=recipe['name']
      // recipeImgPath=recipe['imagePath']
      // description=recipe['description']
     
      if(recipe.ingrediants){
        for(let recIng of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name':new FormControl(recIng.name, Validators.required),
              'amount':new FormControl(recIng.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImgPath, Validators.required),
      'description':new FormControl(description, Validators.required),
      'ingrediants':recipeIngrediants 
    })
    
  }

  getcontrols(){
    return (<FormArray>this.recipeForm.get('ingrediants')).controls
  }

  onSubmit(){    
    if(this.editmode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()

  }

  onAddIngred(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null,  Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.activeRouter})
  }

  onRemoveIngred(ingId:number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(ingId)
  }

}
