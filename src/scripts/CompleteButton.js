import { finishedOrder } from "./TransientState.js"

/*
  Responsibility
    Generate the HTML for the complete requests button,
    and POST a new item to the API when clicked.
*/
const handleFinishedOrder = async (clickEvent) => {
  if(clickEvent.target.id === "finishOrder") {
    await finishedOrder()
  }
}

export const makeBtn = () => {
  
  document.addEventListener("click", handleFinishedOrder)

  return `<button id="finishOrder">Finish</button>`
}