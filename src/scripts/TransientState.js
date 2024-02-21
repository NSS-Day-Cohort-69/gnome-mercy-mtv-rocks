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
    const payload = {
      crafterId: applicationState.userChoices.crafterId,
      craftRequestId: applicationState.userChoices.requestId
    }
    
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    /*const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify() //what are we stringing?
    } */ // Delete selected request

    if(payload.crafterId != 0 && payload.requestId != 0) {
      const post = await fetch("http://localhost:8000/completions", postOptions)
      const postCompletions = post.json()
    }
    
    const renderEvent = new CustomEvent("craftRequestCompleted")
    document.dispatchEvent(renderEvent)

    setCraftRequestId(0)
    setCrafterId(0)
  }
}

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
