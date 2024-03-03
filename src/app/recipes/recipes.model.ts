import { Ingredient } from "../shared/ingredient.model";

export class Recipes{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingrediants:Ingredient[]

    constructor( name:string,desc:string,imagePath:string,ingred:Ingredient[] ){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingrediants=ingred;
    }
}