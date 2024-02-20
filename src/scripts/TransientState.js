/*
    Responsbility:

        Manage application state and provide functions to change permanent
        state with fetch() call to the API.
*/

const API = "https://uqyoy.sse.codesandbox.io/api";

const applicationState = {
  craftTypes: [],
  craftRequests:
    {
      name: "",
      intendedUse: "",
      craftTypeId: 0,
    },
  crafters: [],
  ingredients: [],
  userChoices: {
    crafterId: 0,
    chosenIngredients: new Set(),
    requestId: 0
  }
};

/* 
  Once a new craft completion has been saved in the API,
  add all of the ingredients chosen by the user. 
*/
export const createRequest = async () => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(applicationState.craftRequests)
  }

  if(applicationState.craftRequests.name != "" && applicationState.craftRequests.intendedUse != "" && applicationState.craftRequests.craftTypeId > 0) {

    const response = await fetch("http://localhost:8000/craftRequests", postOptions)
    
  }

  
  
  const renderEvent = new CustomEvent("newCraftRequestCreated")
  document.dispatchEvent(renderEvent)

  setName("")
  setPurpose("")
  setCraftType(0)

console.log(applicationState)
}

const createCraftIngredients = (completion) => {
  const fetchArray = [];

  applicationState.userChoices.chosenIngredients.forEach(
    (chosenIngredientId) => {
      fetchArray.push(
        fetch(`${API}/craftIngredients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ingredientId: chosenIngredientId,
            completionId: completion.id
          })
        })
          .then((response) => response.json())
          .then(() => {
            console.log("Fetch call done");
          })
      );
    }
  );

  // This is where all the fetches (Promises) all run and resolve
  Promise.all(fetchArray).then(() => {
    console.log("All fetches complete");
    applicationState.userChoices.chosenIngredients.clear();
  });
};





// these are all the functions to set our transient state


export const setIngredients = (id) => {
  // Step 1: Use the has() method to determine if the Set has the ingredient
  // Step 2: If it does, remove it with delete() method
  // Step 3: If it does not, add it with add() method
  let mySet = applicationState.userChoices.chosenIngredients
  if (mySet.has(id)) {
    mySet.delete(id)
  }
  else {
    mySet.add(id)
  }
  console.log(applicationState)
};

export const setName = (inputValue) => {
  applicationState.craftRequests.name = inputValue
  console.log(applicationState)
}

export const setPurpose = (inputValue) => {
  applicationState.craftRequests.intendedUse = inputValue
  console.log(applicationState)
}

export const setCraftType = (userChoice) => {
  applicationState.craftRequests.craftTypeId = userChoice
  console.log(applicationState)
}

export const setCraftRequestId = (userChoice) => {
  applicationState.userChoices.requestId = userChoice
  console.log(applicationState)
}

export const setCrafterId = (userChoice) => {
  applicationState.userChoices.crafterId = userChoice
  console.log(applicationState)
}
