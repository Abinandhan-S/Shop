import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";


export class ShoppinglistService{

    newIng = new Subject<Ingredient[]>();
    editIng =new Subject<number>();

    private ingrediants:Ingredient[]=[
        new Ingredient('Fruits',5),
        new Ingredient('Vegetable',10),
    ]

    onShowIngrediant(){
       return this.ingrediants.slice();       
    }

    onEditIngrediant(index:number){
        return this.ingrediants[index]
    }

    updateIngrediant(index:number,updateIng:Ingredient){
        this.ingrediants[index]=updateIng;
        this.newIng.next(this.ingrediants.slice())
    }

    deleteIngredinat(index:number){
        this.ingrediants.splice(index,1);
        this.newIng.next(this.ingrediants.slice())
    }

    addIngrediant(newIngrediant:Ingredient){
        
        this.ingrediants.push(newIngrediant);
        console.log('ShopList1stExecution: ')
        console.log(this.ingrediants); 
        this.newIng.next(this.ingrediants.slice());
        // console.log(newIngrediant);    
    }

    ingredToShopList(ingrediantFromRecipe:Ingredient[]){
        
        this.ingrediants.push(...ingrediantFromRecipe);
        console.log('IngrediantFromRecipe:');
        console.log(...ingrediantFromRecipe);
        this.newIng.next(this.ingrediants.slice());
        
    }


    
}