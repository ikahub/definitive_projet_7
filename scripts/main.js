import recipes from '../data/recipes.js'
import Recipe from './recipe.js'

class Main {

  constructor() {
    
    const tags = ['ingredients', 'appliance', 'ustensils']
    
    this.recipes = recipes.map(recipe => new Recipe(recipe))

    this.filteredRecipes = [...this.recipes]

    this.searchTag = {}
    
    tags.forEach(tag => {
      this.searchTag[tag] = ''
      this.internalIngredientsSearch(tag)
    })

    this.searchString = ''

    this.selectedAppliance = []
    this.selectedUstensil = []
    this.selectedIngredient = []

    this.displayAllFilters()



    this.searchInputKeydown()
    

    this.displayRecipes()

    Object.keys(this.recipesEl).forEach(filter => this.addTitleListener(filter))

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

    Object.keys(this.recipesEl).forEach(filter => this.displayFilterTags(filter))
    //Object.keys(this.recipesEl).forEach(filter => this.removeSelectedFilterItem(filter))
    

    this.ingredientsFilter()
    this.applianceFilter()
    this.ustensilsFilter()
    this.removeSelectedFilterItem()
  }

  displayFilterTags(filterName){

    const elSearchDiv = document.querySelector(`.${filterName}-container`)

    elSearchDiv.innerHTML = ""

    const filterUl = document.createElement('ul')

    filterUl.classList.add(`${filterName}-liste`)
 
    this.matchedSearch = this.recipesEl[filterName].filter(testedCondition => testedCondition.toLowerCase().includes(this.searchTag[filterName]))


      
    this.matchedSearch.forEach(eachFiltered => {
      
      this.condiFilterLi = document.createElement('li')
      this.condiFilterLi.classList.add(`${filterName}-item`)
      this.condiFilterLi.innerText = eachFiltered

      filterUl.appendChild(this.condiFilterLi)
    })
    
    elSearchDiv.appendChild(filterUl)
  }

  displayRecipes() {
    const recipesCntr = document.getElementById('recipes')

    this.filteredRecipes = this.recipes.filter(recipe => recipe.checkMatchingFilters(this.searchString, this.selectedIngredient, this.selectedAppliance, this.selectedUstensil))
    
    recipesCntr.innerHTML = ''

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

        this.selectedIngredientHTML.innerHTML = `${ingredient.innerHTML} <i class="far fa-times-circle selected-ingredients-remove"></i>`

        ingredientsDiv.appendChild(this.selectedIngredientHTML)

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

        this.selectedApplianceHTML.classList.add('selected-appliance')

        this.selectedApplianceHTML.innerHTML = `${appliance.innerHTML}  <i class="far fa-times-circle selected-appliance-remove"></i>`

        applianceDiv.appendChild(this.selectedApplianceHTML)
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

        this.selectedUstensilHTML.innerHTML = `${ustensil.innerHTML}  <i class="far fa-times-circle selected-ustensils-remove"></i>`

        ustensilsDiv.appendChild(this.selectedUstensilHTML)


        this.displayRecipes()
      })
      )


    return this.selectedUstensil && this.selectedUstensilHTML
  }

  internalIngredientsSearch(filterName){
    const searchField = document.getElementById(`${filterName}_search`)
    
    searchField.addEventListener('keydown', (e) => {

      this.searchTag[filterName] = e.target.value.toLowerCase()

      this.displayAllFilters()

    })
  }

  addTitleListener(filterName){

    

    const elSearchDiv = document.querySelector(`.${filterName}-container`)

    const filterTitle = document.querySelector(`.${filterName}FilterTitle`)

    const filterTitleDiv = document.querySelector(`.flex-title-${filterName}`)

    const elSearchFilter = document.getElementById(`${filterName}_search`)

    const chevronSearch = document.querySelector(`.${filterName}-chevron-up`)

    filterTitle.addEventListener('click', () => {
      elSearchDiv.style.display = getComputedStyle(elSearchDiv)['display'] === 'none'? 'block' : 'none'
      filterTitleDiv.style.display = 'none'
      elSearchFilter.style.display = 'flex'
      chevronSearch.style.display = 'flex'
    })

    chevronSearch.addEventListener('click', () =>{
      elSearchDiv.style.display = getComputedStyle(elSearchDiv)['display'] === 'none'? 'block' : 'none'
      filterTitleDiv.style.display = 'flex'
      elSearchFilter.style.display = 'none'
      chevronSearch.style.display = 'none'
    })

  }

  removeSelectedFilterItem(){



    console.log(this.selectedAppliance.length > 0 ? 'toto' : 'tata')



    if(this.selectedIngredient.length > 0){

      console.log(this.selectedAppliance)

      this.selectedIngredientHTML.addEventListener('click', (e) => {
        console.log('tata')

        const clickedContent = e.target.innerText

        this.selectedIngredient.splice(clickedContent, 99999999)

        this.selectedIngredientHTML.style.display = 'none'

        console.log(this.selectedAppliance)

      })

      return this.selectedIngredient && this.selectedIngredientHTML

    }





  }

}

const main = new Main()


