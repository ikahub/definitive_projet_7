import recipes from '../data/recipes.js'


import Recipe from './recipe.js'
//import searchInputKeyup from './search.js'
//console.log(searchInputKeyup)
class Main {

  constructor() {
    
    
    this.recipes = recipes.map(recipe => new Recipe(recipe))

    this.filteredRecipes = [...this.recipes]

    //console.log(this.filteredRecipes)
    
    this.searchString = ''
    this.selectedAppliance = []
    this.selectedUstensil = []
    this.selectedIngredient = []

    //console.log(this.recipesEl)

    this.displayAllFilters()
    this.searchInputKeydown()
    


    this.displayRecipes()

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
    Object.keys(this.recipesEl).forEach(filter => this.internalIngredientsSearch(filter))

    Object.keys(this.recipesEl).forEach(filter => this.displayFilterTags(filter))


    this.ingredientsFilter()
    this.applianceFilter()
    this.ustensilsFilter()

  }

  displayFilterTags(filterName){

    const filterTitle = document.querySelector(`.${filterName}FilterTitle`)



    filterTitle.addEventListener('click', () => {
      this.elSearchDiv.style.display = this.elSearchDiv.style.display === 'none'? 'block' : 'none'

    })



    this.searchField = document.getElementById(`${filterName}_search`).addEventListener('keyup', this.changeText, filterName)



    
    
      
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

    const searchField = document.getElementById(`ingredients_search`)

    this.quelqueChose = searchField.addEventListener('keydown', (e) => {
      this.filterValueArray = []

      //console.log(filterName)

      const searchString = e.target.value.toLowerCase()

      //console.log(searchString)

      

      this.matchedSearch = this.recipesEl[filterName].filter(testedCondition => testedCondition.toLowerCase().includes(searchString))

      //console.log(this.matchedSearch)

      
      


      this.laderniereconst = this.matchedSearch.forEach(filterValue => {
        this.filterValueArray.push(filterValue)
        //console.log(this.filterValueArray)
      })
  })

  console.log(this.quelqueChose)

  return this.quelqueChose
  }

  changeText(event){

    

    this.filterUl = document.createElement('ul')

    this.filterUl.classList.add(`ingredient-liste`)

    this.elSearchDiv = document.querySelector(`.ingredients-container`)


    if(event.target.id === `ingredients_search`){
      
      this.filterValueArray.forEach(filterValue => {
        console.log(filterValueArray)
        const filterLi = document.createElement('li')
  
        filterLi.classList.add(`ingredients-item`)
  
        filterLi.innerHTML = filterValue
  
        this.filterUl.appendChild(filterLi)
      })

      console.log(this.filterValueArray)
      
      this.elSearchDiv.appendChild(this.filterUl)

    }else {
      

    }

    

    this.recipesEl[filterName].forEach(filterValue => {
      //console.log(filterValue)
      const filterLi = document.createElement('li')

      filterLi.classList.add(`ingredients-item`)

      filterLi.innerHTML = filterValue

      this.filterUl.appendChild(filterLi)
      
    })
    
    this.elSearchDiv.appendChild(this.filterUl)

    }

  }


const main = new Main()


