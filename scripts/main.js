import recipes from '../data/recipes.js'


import Recipe from './recipe.js'
//import searchInputKeyup from './search.js'
//console.log(searchInputKeyup)
class Main {

  constructor() {
    
    
    this.recipes = recipes.map(recipe => new Recipe(recipe))

    this.filteredRecipes = [...this.recipes]

    //console.log(this.filteredRecipes)
    //this.matchedSearch = []
    this.searchStringX = ''
    this.searchString = ''
    this.selectedAppliance = []
    this.selectedUstensil = []
    this.selectedIngredient = []

    //console.log(this.recipesEl)

    this.displayAllFilters()

    this.searchInputKeydown()
    


    this.displayRecipes()
    //Object.keys(this.recipesEl).forEach(filter => this.internalIngredientsSearch(filter))

    this.internalIngredientsSearch
  }

  displayAllFilters(){


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


    //console.log(this.recipesEl.appliance)

    Object.keys(this.recipesEl).forEach(filter => this.displayFilterTags(filter))
    Object.keys(this.recipesEl).forEach(filter => this.internalIngredientsSearch(filter))

    this.ingredientsFilter()
    this.applianceFilter()
    this.ustensilsFilter()



  }

  displayFilterTags(filterName){

    const filterTitle = document.querySelector(`.${filterName}FilterTitle`)

    const elSearchDiv = document.querySelector(`.${filterName}-container`)

    elSearchDiv.innerHTML = ""

    filterTitle.addEventListener('click', () => {
      elSearchDiv.style.display = elSearchDiv.style.display === 'none'? 'block' : 'none'

    })

    
    const filterUl = document.createElement('ul')

    filterUl.classList.add(`${filterName}-liste`)
    if(this.searchStringX === ""){
      this.matchedSearch = this.recipesEl[filterName].filter(testedCondition => testedCondition.toLowerCase().includes(this.searchStringX))
      this.matchedSearch.forEach(eachFiltered => {
        console.log(eachFiltered)
        //this.okFilter = eachFiltered === this.recipesEl[filterName]
        this.condiFilterLi = document.createElement('li')
        this.condiFilterLi.classList.add(`${filterName}-item`)
        this.condiFilterLi.innerText = eachFiltered
  
        filterUl.appendChild(this.condiFilterLi)
    })
    }else{
      this.matchedSearch = this.recipesEl[filterName].filter(testedCondition => testedCondition.toLowerCase().includes(this.searchStringX))

      this.matchedSearch.forEach(eachFiltered => {
        console.log(eachFiltered)
        //this.okFilter = eachFiltered === this.recipesEl[filterName]
        this.condiFilterLi = document.createElement('li')
        this.condiFilterLi.classList.add(`${filterName}-item`)
        this.condiFilterLi.innerText = eachFiltered
  
        filterUl.appendChild(this.condiFilterLi)
    })
  }



      
        
    


      //this.stringIsMatching = this.internalIngredientsSearch(filterName)


        
        /*this.matchedSearch.forEach(filterValue => {
          //console.log(filterValue)
          this.filterLi = document.createElement('li')
    
          this.filterLi.classList.add(`${filterName}-item`)
    
          this.filterLi.innerHTML = filterValue
    
          filterUl.appendChild(this.filterLi)
          
        })*/
     
        //console.log("toto")
        //console.log(this.matchedSearch)
        
    
      
    elSearchDiv.appendChild(filterUl)
  }

  /*filterSearchSetup(){
    const searchIngredientsFilter = document.querySelector('.ingredients-input')
    searchIngredientsFilter.addEventListener('keyup', (e) => {
      this.ingredientsString = e.target.value.toLowerCase()
    })
  }*/

  displayRecipes() {
    const recipesCntr = document.getElementById('recipes')
    //Récupérer les filtres search/ingredients/appliance/ustensils
    this.filteredRecipes = this.recipes.filter(recipe => recipe.checkMatchingFilters(this.searchString, this.selectedIngredient, this.selectedAppliance, this.selectedUstensil))
    //console.log(this.searchString)
    //console.log(this.selectedAppliance)
    //console.log(this.selectedIngredient)
    //console.log(this.selectedUstensil)

    
    recipesCntr.innerHTML = ''
    console.log(this.filteredRecipes)
    this.filteredRecipes.forEach(recipe => {
      recipesCntr.appendChild(recipe.generateDomRecipeEl())
    })

    this.displayAllFilters()
  }


  searchInputKeydown(){
    const searchInput = document.getElementById('recipe-search');

    searchInput.addEventListener('keydown',  (e) => {
      this.searchString = e.target.value.toLowerCase()
      this.displayRecipes()
      console.log(this.searchString)
    })
    return this.searchString
  }

  ingredientsFilter(){

    const ingredientsDiv = document.querySelector('.selected-ingredients-buttons')
    const ingredientsItems = document.querySelectorAll('.ingredients-item')

    ingredientsItems.forEach(ingredient => 

      ingredient.addEventListener('click', () => {

        this.selectedIngredient.push(ingredient.innerHTML)

        this.selectedIngredientHTML = document.createElement('span')

        this.selectedIngredientHTML.classList.add('selected-ingredient')

        this.selectedIngredientHTML.innerHTML = ingredient.innerHTML

        ingredientsDiv.appendChild(this.selectedIngredientHTML)

        //console.log("toto")
        this.displayRecipes()

      }))

    return this.selectedIngredient && this.selectedIngredientHTML
  }

  applianceFilter(){

    const applianceDiv = document.querySelector('.selected-appliance-buttons')
    const applianceItems = document.querySelectorAll('.appliance-item')

    applianceItems.forEach(appliance => {
      appliance.addEventListener('click', () => {

        this.selectedAppliance.push(appliance.innerHTML)

        this.selectedApplianceHTML = document.createElement('span')
        //console.log(this.selectedAppliance)

        this.selectedApplianceHTML.classList.add('selected-appliance')

        this.selectedApplianceHTML.innerHTML = appliance.innerHTML

        applianceDiv.appendChild(this.selectedApplianceHTML)
        console.log('toto')
        this.displayRecipes()
      })})

    return this.selectedAppliance && this.selectedApplianceHTML
  }

  ustensilsFilter(){

    const ustensilsDiv = document.querySelector('.selected-ustensils-buttons')
    const ustensilsItems = document.querySelectorAll('.ustensils-item')

    ustensilsItems.forEach(ustensil =>
      ustensil.addEventListener('click', () => {

        this.selectedUstensil.push(ustensil.innerHTML)

        this.selectedUstensilHTML = document.createElement('span')

        this.selectedUstensilHTML.classList.add('selected-ustensils')

        this.selectedUstensilHTML.innerHTML = ustensil.innerHTML

        ustensilsDiv.appendChild(this.selectedUstensilHTML)

        this.displayRecipes()
      })
      )

    return this.selectedUstensil && this.selectedUstensilHTML
  }

  internalIngredientsSearch(filterName){
    this.searchField = document.getElementById(`${filterName}_search`)

    this.searchField.addEventListener('keydown', (e) => {
  
      

      //console.log(filterName)

      this.searchStringX = e.target.value.toLowerCase()

      //console.log(searchString)

      this.displayAllFilters()
      console.log(this.matchedSearch)

    })
    return this.searchStringX
  }
}

const main = new Main()


