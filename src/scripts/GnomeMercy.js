/*
  Responsibility
    Generate the entire HTML string template for 
    Gnome Mercy by using all other HTML generation
    components.
*/
import { RequestForm } from "./RequestForm.js";
import { craftRequests } from "./CraftRequests.js"
import { IngredientOptions } from "./Ingredients.js";
import { Crafters } from "./Crafters.js"
import { makeBtn } from "./CompleteButton.js";
import { completedOrders } from "./Completions.js";

export const GnomeMercy = async () => {

const requestFormHtml = await RequestForm()
const ingredientsHTML = await IngredientOptions()
const craftRequestHTML = await craftRequests()
const craftersHTML = await Crafters()
const finishBtn = makeBtn()
const completionHTML = await completedOrders()

  return `
    <h1>Gnome Mercy</h1>

    <article id="RequestForm">
    ${requestFormHtml}
    </article>
    
    <article id="CompleteRequests">

    <section id="craftRequests">
    ${craftRequestHTML}
    </section>

    <section id="crafters">
    ${craftersHTML}
    </section>

    <section id="Ingredients">
    <h1>Ingredients</h1>
    ${ingredientsHTML}
    </section>

    <section id="finish-order">
    ${finishBtn}
    </section>
    </article>

    <section id="completed-orders">
    <h3>Completed Potions and Elixers</h3>
    ${completionHTML}
    </section>
    `;
};
