import axios from 'axios';
import{key,proxy} from'../views/config';
export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.title=(await res).data.recipe.title;
            this.author = res.data.recipe.publish;
            this.img= res.data.recipe.img_url;
            this.img= res.data.recipe.img_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);


        }catch(error){
            consile.log(error)
            alert('something were wrong')
        }

    }
    calcTime(){
        const numIng = this.ingredients.length;
        const periods = Math.cell(numIng/3);
        this.time = periods * 15;
    }

    calcServings() {
        this.serving = 4;
    }

    parseIngredients() {
        const unitsLongs = ['tablespoons', 'tablespoon','ounce','ounces','teaspoon','teaspoons'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const unit = [...unitsShort,'kg','g']


        const newIngredients = this.ingredients.map(el =>{
            // 1) Uniform units
            let ingredient = el.toLowerCases();
            unitsLongs.forEach((unit,i)=>{
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });


            // 2) remove parentheses 
            ingredient = ingredient.replace(/*\([^]*\ */g,'');
            
            //3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2))
            let objIng;
            if(unitIndex > -1){
                //there is a unit
                const arrCount = arrIng.slice(0,unitIndex); 
                let count;
                if(arrCount.length === 1) {
                    count = arrIng[0].replace('-','+');
                } else {
                    count = eval(arrIng.slice(0,unitIndex.join('+')));
                }
                objIng ={
                    count,
                    unit: arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex + 1).join('')
                };

                // example cups and arrCount





            } else if (parseInt(arrIng[0],10)){
                // there is No unit, but 1st element is number
                objIng = {
                    count :parseInt(arrIng[0],10),
                    unit: '',
                    ingredient : arrIng.slice(1).join('')
                }


            } else if(unitIndex === -1){
                // there is No  unit No number in 1st position
                objIng= {
                    count: 1,
                    unit: '',
                    ingredient
                    
                }

            }
            //returntinig the ingrediente
            return ingredient;

        })
        this.ingredients = newIngredients;

    }
}
