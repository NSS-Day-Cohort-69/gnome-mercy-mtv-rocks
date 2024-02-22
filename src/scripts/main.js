import { GnomeMercy } from "./GnomeMercy.js";

const mainContainer = document.querySelector("#container");

const render = async () => {

    mainContainer.innerHTML = await GnomeMercy()
};
document.addEventListener("newCraftRequestCreated", render)
document.addEventListener("craftRequestCompleted", render)
render();