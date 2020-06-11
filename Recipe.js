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
}