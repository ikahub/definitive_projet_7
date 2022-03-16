import recipeTmpl from "../templates/recipeTmpl.js"
class Recipe {

  constructor(data = {name: "", servings: null, ingredients: [], time: null, description: "", appliance: "", ustensils: ""}){
    this.ingredients = data?.ingredients || []
    this.name = data?.name || ''
    this.servings = data?.servings || null
    this.time = data?.time || null
    this.description = data?.description || ''
    this.appliance = data?.appliance || ''
    this.ustensils = data?.ustensils || []
  }

  generateDomRecipeEl() {

    /////// RECIPE GENERATION //////
    const domRecipe = document.createElement('div')
    domRecipe.classList.add('div-recipe')
    domRecipe.innerHTML = recipeTmpl
    domRecipe.querySelector('.name').innerText = this.name
    this.ingredients.forEach(ingredient => {
      const ingredientSpan = document.createElement('span')
      ingredientSpan.classList.add('ingredient')
      if(ingredient.unit){
        ingredientSpan.innerText = ingredient.ingredient + ": " + ingredient.quantity + " " + ingredient.unit
      }else{
        ingredientSpan.innerText = ingredient.ingredient + ": " + ingredient.quantity
      }
      domRecipe.querySelector('.ingredients-div').appendChild(ingredientSpan)
    })
    domRecipe.querySelector('.servings').innerText = `Pour : ${this.servings} personnes`
    domRecipe.querySelector('.time').innerText = `Temps de préparation : ${this.time} minutes`
    domRecipe.querySelector('.description').innerText = this.description
    domRecipe.querySelector('.appliance').innerText = this.appliance
    domRecipe.querySelector('.ustensils').innerText = this.ustensils
    domRecipe.querySelector('.name').innerText = this.name

    return domRecipe
  }

  // Méthode checkMatchingFilters 4 param pour les 4 filtres

  checkMatchingFilters(filterSearch, filterIngredients, filterAppliance, filterUstensils){
    const matchingSearch = this.checkMatchingSearch(filterSearch)
    //console.log(matchingSearch)
    const matchingUstensils = this.checkMatchingUstensils(filterUstensils)
    //console.log(matchingUstensils)
    const matchingAppliance = this.checkMatchingAppliance(filterAppliance)
    //console.log(matchingAppliance)
    const matchingIngredients = this.checkMatchingIngredients(filterIngredients)
    //console.log(matchingIngredients)

    return matchingAppliance && matchingIngredients && matchingSearch && matchingUstensils

  }

  checkMatchingIngredients(filterIngredients){
    let isMatchingIngredients = false

    if(filterIngredients && filterIngredients.length){
      for (let i = 0; i < filterIngredients.length; i++) {
        const filterIngredient = filterIngredients[i].toLowerCase();
        //console.log(filterIngredient)
        for (let j = 0; j < this.ingredients.length; j++) {
          const ingredient = this.ingredients[j].ingredient.toLowerCase();
          isMatchingIngredients = filterIngredient === ingredient || isMatchingIngredients
        }
      }
    }else{
      isMatchingIngredients = true
    }

    return isMatchingIngredients 
  }

  checkMatchingSearch(filterSearch){

    const isMatchingName = this.name.toLowerCase().includes(filterSearch.toLowerCase())
    
    const isMatchingDescription = this.description.toLowerCase().includes(filterSearch.toLowerCase())
    const isMatchingServings = this.servings?.toString()?.includes(filterSearch) //TOSTRING ERROR CONSOLE
    const isMatchingTime = this.time?.toString()?.includes(filterSearch) //TOSTRING ERROR CONSOLE
    const isMatchingAppliance = this.appliance.toLowerCase().includes(filterSearch.toLowerCase())
    
    let isMatchingIngredients = true
    
        for (let j = 0; j < this.ingredients.length; j++) {
          const ingredient = this.ingredients[j];
          isMatchingIngredients = ingredient.ingredient.toLowerCase().includes(filterSearch.toLowerCase()) //TOLOWERCASE ERROR CONSOLE X2
        }
    
    let isMatchingUstensils = true

        for (let j = 0; j < this.ustensils.length; j++) {
          const ustensil = this.ustensils[j];
          isMatchingUstensils = ustensil.toLowerCase().includes(filterSearch.toLowerCase()) //TOLOWERCASE ERROR CONSOLE X2
        }
        
    return isMatchingName || 
           isMatchingDescription ||
           isMatchingServings ||
           isMatchingTime ||
           isMatchingAppliance ||
           isMatchingIngredients ||
           isMatchingUstensils
  }

  checkMatchingAppliance(filterAppliance){

    let isMatchingAppliance = true

    if(filterAppliance && filterAppliance.length){
      for (let i = 0; i < filterAppliance.length; i++) {
        const filterAppliance = filterAppliance[i];
        for (let j = 0; j < this.appliance.length; j++) {
          const appliance = this.appliance[j];
          isMatchingAppliance = filterAppliance === appliance && isMatchingAppliance
        }
      }
    }

    return isMatchingAppliance
  }

  checkMatchingUstensils(filterUstensils){

  let isMatchingUstensils = true

    if(filterUstensils && filterUstensils.length){
      for (let i = 0; i < filterUstensils.length; i++) {
        const filterUstensils = filterUstensils[i];
        for (let j = 0; j < this.ustensils.length; j++) {
          const ustensils = this.ustensils[j];
          isMatchingUstensils = filterUstensils === ustensils && isMatchingUstensils
        }
      }
    }

    return isMatchingUstensils
  }
}

export default Recipe

