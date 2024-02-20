/*
  Responsibility
    Generate HTML for checkboxes for each ingredient and
    store each choice in transient state.
*/


export const IngredientOptions = async () => {

  const response = await fetch("http://localhost:8000/ingredients")
  const ingredients = await response.json()
  let html = '<div id="ingredient">'

  for (const ingredient of ingredients) {
    html +=`<input type="checkbox" value=${ingredient.id}/>${ingredient.name}`
  }
  html+= '</div>'
  return html
}

