import { setCraftRequestId } from "./TransientState.js"

const handleRequestChange = (changeEvent) => {
  if(changeEvent.target.id === "craftRequest") {
    setCraftRequestId(parseInt(changeEvent.target.value))
  }
}

export const craftRequests = async () => {
  const response1 = await fetch ("http://localhost:8000/craftRequests")
  const requests = await response1.json()
  const response2 = await fetch ("http://localhost:8000/completions")
  const completions = await response2.json()

  document.addEventListener("change", handleRequestChange)

  let craftRequestHTML = `<div>
  <h3>Craft Requests</h3>
  <select id="craftRequest">
  <option value= "" selected disabled hidden>Craft Request</option>
`
  const validRequests = []

  for (const request of requests) {
    let isCompleted = false
    for (const completion of completions) {
      if(request.id === completion.craftRequestId){
        isCompleted = true
      }
      
    }
    if (isCompleted === false) {
      validRequests.push(request)
    }
  }

  const craftString = validRequests.map(
    (request) => {
      return  `<option value='${request.id}'>${request.name}</option>`
    }
  )

craftRequestHTML += craftString.join("")
craftRequestHTML += `</select>
</div>`;
return craftRequestHTML
}