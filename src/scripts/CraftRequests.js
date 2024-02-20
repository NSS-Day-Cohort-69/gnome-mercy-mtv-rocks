import { setCraftRequestId } from "./TransientState.js"

/*
  Responsibility
    Generate HTML for the dropdown of craftRequests.

    Criteria:
      * Only incomplete requests should be converted to options
*/

const handleRequestChange = (changeEvent) => {
  if(changeEvent.target.id === "craftRequest") {
    setCraftRequestId(changeEvent.target.value)
  }
}

export const craftRequests = async () => {
  const response = await fetch ("http://localhost:8000/craftRequests")
  const requests = await response.json()

  document.addEventListener("change", handleRequestChange)

  let craftRequestHTML = `<div>
  <h3>Craft Requests</h3>
  <select id="craftRequest">
  <option value= "" selected disabled hidden>Craft Request</option>
`
  const craftString = requests.map((request) => {
    return `<option value='${request.id}'>${request.name}</option>`

});
craftRequestHTML += craftString.join("")
craftRequestHTML += `</select>
</div>`;
return craftRequestHTML
}