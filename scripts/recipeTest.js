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