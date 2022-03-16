import recipes from "../data/recipes.js";
import Recipe from './recipe.js';


const mappedRecipes = recipes.map(recipe => new Recipe(recipe))
/*function searchInputKeyup(){
    
    const searchString = searchInput.target
    const filteredRecipes = mappedRecipes.filter((recipe) => {
      return recipe.name.toLocaleLowerCase().includes(searchString) ||
             recipe.description.toLocaleLowerCase().includes(searchString)
    })
    const newRecipesArray = filteredRecipes
    console.log(newRecipesArray)

}*/

/*const searchInput = document.getElementById('recipe-search')
const newRecipesArray = searchInput.addEventListener('keyup', () => {
    const searchString = searchInput.value.toLocaleLowerCase()
    const filteredRecipes = mappedRecipes.filter((recipe) => {
      return recipe.name.toLocaleLowerCase().includes(searchString) ||
             recipe.description.toLocaleLowerCase().includes(searchString)
    })
    console.log(filteredRecipes)
})
console.log(newRecipesArray)
export default newRecipesArray
//export default filteredRecipes*/






/*export default function searchInputKeyup(e){
    const recipesMap = recipes.map(recipe => new Recipe(recipe))
    const searchString = e.target.value.toLocaleLowerCase()
    const filteredRecipes = recipesMap.filter((recipe) => {
      return recipe.name.toLocaleLowerCase().includes(searchString) ||
             recipe.description.toLocaleLowerCase().includes(searchString)
    })
    console.log(filteredRecipes)
    console.log(recipesMap)
    return filteredRecipes
}
*/




/*class Search{
    constructor(data = {name: "", servings: null, ingredients: [], time: null, description: "", appliance: "", ustensils: ""}){
        this.ingredients = data?.ingredients || []
        this.name = data?.name || ''
        this.servings = data?.servings || null
        this.time = data?.time || null
        this.description = data?.description || ''
        this.appliance = data?.appliance || ''
        this.ustensils = data?.ustensils || []

        this.recipes = recipes.map(recipe => new Recipe(recipe))
        this.filteredRecipes = this.recipes

        const searchInput = document.getElementById('recipe-search');
        searchInput.addEventListener('keyup', this.searchInputKeyup.bind(this))
        

      } 

      searchInputKeyup(e){
    
    
        const searchString = e.target.value.toLowerCase()
        this.filteredRecipes = this.recipes.filter((recipe) => {
          return recipe.name.toLocaleLowerCase().includes(searchString) ||
                 recipe.description.toLocaleLowerCase().includes(searchString) ||
                 recipe.ingredients.includes(searchString) ||
                 recipe.ingredients.includes(searchString) ||
                 recipe.ingredients.includes(searchString) ||
                 recipe.ingredients.includes(searchString)
        })
        console.log(this.filteredRecipes)
        console.log(this.recipes)
        return this.recipes = this.filteredRecipes
      }
}*/

//export default Search

//const search = new Search()