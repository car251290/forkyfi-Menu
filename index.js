import Search from '../models/Search';
import {elements,renderLoader,clearLoader} from './views/base'
import * as searchView from './views/searchView'
import { elementsSting } from '../views/base';
import Recipe from '../models/Recipe';

// this is the global state
//searcg object
//shooping list object
//current recipe object
const state = {};
const controlSearch = async() => {
    //get the query for the view
    const query = searchView.getInput(); //100
    console.log(query)

    if(query) {
        // new searhc object adn add to state
        state.search = new Search(query);
        //clear the search input
        searchView.clearInput();
        //clear the results 
        searchView.clearResults();

        renderLoader(elementsSting.searchRes);
        
       try{
            // search for recipes
       await state.search.getResults();
       //render resultos in the UI
       //to clear the loader
       clearLoader();

       searchView.renderResults(state.search.result);
       }catch(err){
        alert('error in the result')
        clearLoader();
    }

    } 

}

searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});
//for the click of the element and go for the next button

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline')
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        
        searchView.renderResults(state.search.result,goToPage);
        searchView.clearResult();
       
    }
   
})
const controlRecipe =() => {
    //get the id for the URL
    const id = window.location.hash.replace('#','')
    console.log(id)
    //The condition othe id
    if(id){

        //prepare ui for changes
        

        //create new recipe object
        state.recipe = new Recipe(id);

        //global window objet to have acces to the state and the recipe
       // window.r=state.recipe;
        
        try{
            //get recipe data and fetche the parseIngredients

        await state.recipe.getRecipe();
        console.log(state.recipe.ingredients)
        state.recipe.parseIngredients();

        //calculate serving 
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        console.log(state.recipe)
 
        } catch(err) {
            alert('error in the recipe')
        }



    }
}

//window.addEventListener('haschange',controlRecipe)
//window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe))



