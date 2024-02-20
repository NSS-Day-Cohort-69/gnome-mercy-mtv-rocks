/*
  Responsibility
    Generate HTML for the request form. When Submit button
    is clicked, POST a new request to the API.
*/

document.addEventListener("click", (clickEvt) => {
  if (clickEvt.target.id === "submitRequest") {
  }
});

export const RequestForm = async () => {

  const response = await fetch("http://localhost:8000/craftTypes")
  const craftTypes = await response.json()

  const craftTypesArr = craftTypes.map(
    (craftType) => {
      return `<option value=${craftType.id}>${craftType.type}</option>`
    }
  )

  const craftTypeHTML = craftTypesArr.join("")

  let html = `
    <div class="field flex column">
     <label class="label" for="name">Name</label>
     <input type="text" id="name" class="input">

     <input class="label" for="purpose"Purpose</label>
     <input type="text" id="purpose" class="input">

    <select id="craftType">
    <option value =''disabled selected hidden>Select a Type</option>
    ${craftTypeHTML}
    </select>

     <button class="button" id="submitRequest">Submit Request</button>
    </div>
    `;
  return html;
};

// Do this first because it is first on page
// Link to request types:  http://localhost:8000/craftTypes