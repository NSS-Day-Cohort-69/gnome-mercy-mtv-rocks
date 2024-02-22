import { setIngredients } from "./TransientState.js"

const handleIngredientChoiceChange = (changeEvent) => {
  if(changeEvent.target.name === "ingredient") {
    setIngredients(parseInt(changeEvent.target.value))
  }
}

export const IngredientOptions = async () => {

  document.addEventListener("change", handleIngredientChoiceChange)
  const response = await fetch("http://localhost:8000/ingredients")
  const ingredients = await response.json()
  let html = '<div id="ingredient">'

  for (const ingredient of ingredients) {
    html +=`<input type="checkbox" id="list-item" name="ingredient" value='${ingredient.id}'/>${ingredient.name}`
  }
  html+= '</div>'
  return html
}


