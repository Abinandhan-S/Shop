import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../services/shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppinglistService]
})

export class ShoppingListComponent implements OnInit, OnDestroy{
  
  // ingrediants: Ingredient[]=[
  //   new Ingredient('Fruits',5),
  //   new Ingredient('Vegetable',10),
  // ]

  shopListIngrediants: Ingredient[]
  constructor(private shoppingListService:ShoppinglistService){}
 
  private ingshpListSubscription:Subscription

  ngOnInit(): void {
   this.shopListIngrediants = this.shoppingListService.onShowIngrediant();
  //  console.log(this.shopListIngrediants)
  
   this.ingshpListSubscription=this.shoppingListService.newIng.subscribe(

      (ingred:Ingredient[])=>{
      this.shopListIngrediants=ingred
      console.log('ShopList2ndExecution:');
      console.log(ingred);
      
    }
   )

  }

  ngOnDestroy(): void {
    console.log('Shoplist Destroyer called');
    this.ingshpListSubscription.unsubscribe()
  }

  onEditItem(index:number){
    this.shoppingListService.editIng.next(index);
  }


  
 
}
