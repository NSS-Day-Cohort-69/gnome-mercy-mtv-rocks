/*
    Responsbility:

        Manage application state and provide functions to change permanent
        state with fetch() call to the API.
*/

const API = "http://localhost:8000";

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
  userChoices:
    {
      crafterId: 0, // Post to API, get back in Completion object
      chosenIngredients: new Set(), // Access after we have access to latest completion object
      requestId: 0 //// Post to API, get back in Completion object
    }
};

export const finishedOrder = async () => {
  if (applicationState.userChoices.crafterId && applicationState.userChoices.requestId) {
    const payload1 = {
      crafterId: applicationState.userChoices.crafterId,
      craftRequestId: applicationState.userChoices.requestId
    }

    const postOptions1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload1)
    }


    if(payload1.crafterId != 0 && payload1.requestId != 0) {
      const post1 = await fetch("http://localhost:8000/completions", postOptions1)
      const response = await fetch("http://localhost:8000/completions")
      const completions = await response.json()
      for (const ingredient of applicationState.userChoices.chosenIngredients) {
        for (const completion of completions) {
          if (completion.id === completions.length) {
            const payload2 = {
            ingredientId: ingredient,
            completionId: completion.id
          }

          const postOptions2 = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload2)
          }

          const post2 = await fetch("http://localhost:8000/craftIngredients", postOptions2)
          const craftIngredients = await post2.json()
        }
      }
    }
    
    const renderEvent = new CustomEvent("craftRequestCompleted")
    document.dispatchEvent(renderEvent)

    setCraftRequestId(0)
    setCrafterId(0)
  }
}}

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
  let mySet = applicationState.userChoices.chosenIngredients
  if (mySet.has(id)) {
    mySet.delete(id)
  }
  else {
    mySet.add(id)
  }
};

export const setName = (inputValue) => {
  applicationState.craftRequests.name = inputValue
}

export const setPurpose = (inputValue) => {
  applicationState.craftRequests.intendedUse = inputValue
}

export const setCraftType = (userChoice) => {
  applicationState.craftRequests.craftTypeId = userChoice
}

export const setCraftRequestId = (userChoice) => {
  applicationState.userChoices.requestId = userChoice
}

export const setCrafterId = (userChoice) => {
  applicationState.userChoices.crafterId = userChoice
}
