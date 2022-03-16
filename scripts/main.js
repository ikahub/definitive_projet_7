import recipes from '../data/recipes.js'


import Recipe from './recipe.js'
//import searchInputKeyup from './search.js'
//console.log(searchInputKeyup)
class Main {

  constructor() {
    
    
    this.recipes = recipes.map(recipe => new Recipe(recipe))

    this.filteredRecipes = [...this.recipes]

    console.log(this.filteredRecipes)
    this.recipesEl = this.filteredRecipes.reduce((acc, current) => {
      acc.ingredients.push(...current.ingredients.filter(ing => !acc.ingredients.includes(ing.ingredient)).map(ing => ing.ingredient))

      if(!acc.appliance.includes(current.appliance)){
        acc.appliance.push(current.appliance)
      }
      current.ustensils.forEach(ustensil => {
        if(!acc.ustensils.includes(ustensil)){
          acc.ustensils.push(ustensil)
        }
      })
      

      return acc
    }, {ingredients:[],appliance:[],ustensils:[]})
    
    this.searchString = ''
    this.selectedAppliance = []
    this.selectedUstensil = []
    this.selectedIngredient = []

    console.log(this.recipesEl)

    
    Object.keys(this.recipesEl).forEach(filter => this.displayAllFilter(filter))
    
    this.searchInputKeydown()
    this.ingredientsFilter()
    this.applianceFilter()
    this.ustensilsFilter()

    this.displayRecipes()
    
  }


  displayAllFilter(filterName){
    const divFilter = document.getElementById('div-filter')

    const filterUl = document.createElement('ul')

    filterUl.classList.add(`${filterName}-liste`)

    this.recipesEl[filterName].forEach(filterValue => {
      const filterLi = document.createElement('li')

      filterLi.classList.add(`${filterName}-item`)

      filterLi.innerHTML = filterValue

      //console.log(appliance)

      filterUl.appendChild(filterLi)
      
    })
    divFilter.appendChild(filterUl)
  }

  displayRecipes() {
    const recipesCntr = document.getElementById('recipes')
    //Récupérer les filtres search/ingredients/appliance/ustensils
    this.filteredRecipes = this.recipes.filter(recipe => recipe.checkMatchingFilters(this.searchString, this.selectedIngredient, this.selectedAppliance, this.selectedUstensil))
    console.log(this.searchString)
    console.log(this.selectedAppliance)
    console.log(this.selectedIngredient)
    console.log(this.selectedUstensil)

    
    recipesCntr.innerHTML = ''
    console.log(this.filteredRecipes)
    this.filteredRecipes.forEach(recipe => {
      recipesCntr.appendChild(recipe.generateDomRecipeEl())
    })
  }


  searchInputKeydown(){
    const searchInput = document.getElementById('recipe-search');

    searchInput.addEventListener('keydown',  (e) => {
      this.searchString = e.target.value.toLowerCase()
      this.displayRecipes()
      console.log(this.searchString)
    })
    //return this.searchString
  }

  ingredientsFilter(){
    const ingredientsItems = document.querySelectorAll('.ingredients-item')
    ingredientsItems.forEach(ingredient => 
      ingredient.addEventListener('click', () => {
        this.selectedIngredient.push(ingredient.innerHTML)
        this.displayRecipes()
        console.log(this.selectedIngredient)
      }))
    //return this.selectedIngredient
  }

  applianceFilter(){
    const applianceItems = document.querySelectorAll('.appliance-item')
    applianceItems.forEach(appliance => {
      appliance.addEventListener('click', () => {
        this.selectedAppliance.push(appliance.innerHTML)
        console.log(this.selectedAppliance)
      })})
    //return this.selectedAppliance
  }

  ustensilsFilter(){
    const ustensilsItems = document.querySelectorAll('.ustensils-item')
    ustensilsItems.forEach(ustensil => 
      ustensil.addEventListener('click', () => {
        this.selectedUstensil.push(ustensil.innerHTML)
        console.log(this.selectedUstensil)
      })
      )
    return this.selectedUstensil
  }
  
}

const main = new Main()
