import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs-compat';
import { ShoppinglistService } from 'src/app/services/shoppingList.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  // @ViewChild('nameInputData') nameElementData:ElementRef
  // @ViewChild('amountInputData') amountElementData:ElementRef
  
  // @Output() newIngrediantAdded= new EventEmitter<Ingredient>()

   // onAddIngrediant(){
     
  //   const inpName=this.nameElementData.nativeElement.value;
  //   const inpAmount=this.amountElementData.nativeElement.value;
  //   const inpIngrediant= new Ingredient(inpName,inpAmount);
  //   // this.newIngrediantAdded.emit(inpIngrediant);
  //   this.shoppingListService.addIngrediant(inpIngrediant);
  // }
  
  ingSubscription:Subscription
  editMode=false;
  editedItemIndex:number;
  editItem:Ingredient
  @ViewChild('formData') formEditData:NgForm;
  constructor(private shoppingListService:ShoppinglistService){}

  ngOnInit(): void {
    this.ingSubscription=this.shoppingListService.editIng.subscribe(
      (index)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editItem=this.shoppingListService.onEditIngrediant(index);
        this.formEditData.setValue({
          nameInputData:this.editItem.name,
          amountInputData:this.editItem.amount
        }
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }

  onAddIngrediant(form:NgForm){
    // const inpIngrediant= new Ingredient(form.value.nameInputData,form.value.amountInputData);

    const formValue= form.value
    const inpIngrediant= new Ingredient(formValue.nameInputData,formValue.amountInputData);
    if(this.editMode){
      this.shoppingListService.updateIngrediant(this.editedItemIndex,inpIngrediant)
    }
    else{
      this.shoppingListService.addIngrediant(inpIngrediant);
    }
    this.editMode=false
    this.formEditData.reset()
  }

  onClear(){
    this.formEditData.reset();
    this.editMode=false
  }

  onDelete(){
    this.shoppingListService.deleteIngredinat(this.editedItemIndex);
    this.onClear()
  }
  
  


}
