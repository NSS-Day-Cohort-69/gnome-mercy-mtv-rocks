export const completedOrders = async () => {
  const response = await fetch("http://localhost:8000/completions?_expand=craftRequest")
  const orders = await response.json()
  let orderHTML = ""

  const orderDivs = orders.map((order) => {
    return `<div>
    ${order.craftRequest.name}
    </div>`
  })
  orderHTML += orderDivs.join("")

  return orderHTML

}


/*
  Responsibility
    Generate the HTML for all completed potions and elixirs
*/
