import { setCraftType, setName, setPurpose, createRequest } from "./TransientState.js";

/*
  Responsibility
    Generate HTML for the request form. When Submit button
    is clicked, POST a new request to the API.
*/


const handleNameChange = (inputEvent) => {
  if(inputEvent.target.id === "name") {
    setName(inputEvent.target.value)
  }
}

const handleIntendedUseChange = (inputEvent) => {
  if(inputEvent.target.id === "purpose") {
    setPurpose(inputEvent.target.value)
  }
}

const handleCraftTypeChange = (changeEvent) => {
  if(changeEvent.target.id === "craftType") {
    setCraftType(parseInt(changeEvent.target.value))
  }
}

const handleRequestSubmission = (clickEvent) => {
  if(clickEvent.target.id === "submitRequest") {
    createRequest()
  }
}

export const RequestForm = async () => {

  const response = await fetch("http://localhost:8000/craftTypes")
  const craftTypes = await response.json()

  document.addEventListener("input", handleNameChange)
  document.addEventListener("input", handleIntendedUseChange)
  document.addEventListener("change", handleCraftTypeChange)
  document.addEventListener("click", handleRequestSubmission)
  
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

     <label class="label" for="purpose">Purpose</label>
     <input type="text" id="purpose" class="input">

    <label class="label" for="types">Types</label>
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

