// GET method / SHOWING THE CHORE CARDS

let choreListContainer = document.getElementById('chore-list')

fetch('http://localhost:3000/chores')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    renderChoreCard(json)
  })

function renderChoreCard(list) {

  list.forEach( (choreObject) => {
    choreListContainer.innerHTML  += `<div class="chore-card">
      <button class="delete-button" data-id="${choreObject["id"]}">x</button>
      <h3> ${choreObject["title"]} </h3>
      <p> Duration: ${choreObject["duration"]} </p>
      <input><!-- value should have the importance  -->
    </div> `
  })

}

// POST method / ADDING NEW CHORE CARDS

function addNewChoreCard(url) {
  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      // body (which holds our input data) is an object
      body: JSON.stringify({
        title: document.getElementById('title').value,
        priority: document.getElementById('priority').value,
        duration: document.getElementById('duration').value
      })
    }).then( (response) => {
      // parses response to JSON, add data to JSON array
      return response.json()
    })
    .then( (json) => {
      choreListContainer.innerHTMl += `<div class="chore-card">
        <button class="delete-button" data-id="${json["id"]}">x</button>
        <h3> ${json["title"]} </h3>
        <p> Duration: ${json["duration"]} </p>
        <input><!-- value should have the importance  -->
      </div> `
    })
}

    // do not wrap around function!!
    let choreForm = document.getElementById('new-chore-form')

    choreForm.addEventListener( 'submit', (event) => {
      event.preventDefault()

      // fetch new chore card and parse to json
      addNewChoreCard('http://localhost:3000/chores')

      // reset the form input fields
      event.target.reset()
    })


// DELET METHOD - DELETE CHORE CARDS

function deleteChoreCard(url, eventId) {

  return fetch(url + "/" + eventId, {
    method: 'DELETE',
  })
  // not necessary to return response data
  // .then( (response) => {
  //   return response.json()
  // })

}

// 'x' button on the chore container
choreListContainer.addEventListener('click', (event) => {
  // debugger
  // event.target shows <button class="delete-button" data-id="an id">x</button>
  // to limit a target to just the button:
  if (event.target.tagName === 'BUTTON') {

    // deletes from backend
    deleteChoreCard('http://localhost:3000/chores', parseInt(event.target.dataset.id))

    // need to delete the specific chore card from frontend
    event.target.parentNode.remove()
  }

})






















//end here!
