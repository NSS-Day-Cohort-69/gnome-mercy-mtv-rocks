/*
  Responsibility
    Generate HTML for the dropdown of crafters. When one is
    selected, update transient state.
*/

const getCrafters = async () => {
  const response = await fetch("http://localhost:8000/crafters")
  const crafters = await response.json()
  
  return crafters
}

export const Crafters = async () => {
  
  const crafters = await getCrafters();

  let htmlStr = `
    <h3>Crafters</h3>
    <select id="crafter">
    <option value="" selected disabled hidden>--Choose A Crafter--</option>`

  const renderCrafterOptions = crafters.map(
    (crafter) => {
      htmlStr += `<option value="${crafter.id}">${crafter.name}</option>`
    }
  )
  htmlStr += `</select>`
  
  return htmlStr
};

// option value= "" selected disabled hidden
