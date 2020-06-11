import axios from 'axios';
import{key,proxy} from'../views/config';
export default class Search {
    constructor (query) {
        this.query = query;
    }
    async getResults() {
         //web proxy to help the axios for the food2
    const proxy = 'htpp//cors-anywhere.herokuapp.com/';
    //the Api key
    const key = '462b1cc8d4f2730081462fbc65136320';
    // the try and catch method for the request of the recipy
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    } 

}


