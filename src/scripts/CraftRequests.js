/*
  Responsibility
    Generate HTML for the dropdown of craftRequests.

    Criteria:
      * Only incomplete requests should be converted to options
*/

export const craftRequests = async () => {
  const response = await fetch ("http://localhost:8000/craftRequests")
  const requests = await response.json()

  let craftRequestHTML = `<div>
  <select id="craftRequest">
  <option value= "" selected disabled hidden>Craft Request</option>
`
  const craftString = requests.map((request) => {
    return `<option value = '${request.id}'>${request.name}</option>`

});
craftRequestHTML += craftString.join("")
craftRequestHTML += `</select>
</div>`;
return craftRequestHTML
}