let API = 'http://hp-api.herokuapp.com/api/characters'

function HarryPotterListfetch ()  { //fetching the API data
    return fetch (API)
    .then(response =>response.json())
    .then(json => json);
     
     

}


document.addEventListener ('DOMContentLoaded', () => { //Wait for the DOM content to finish loading before we start running our JavaScript

  HarryPotterListfetch().then (characters => { //API Data List
      characters.forEach(character => {
        let list = document.createElement('tr');
        list.innerHTML = `<td>${character.name}<td>${character.species}<td>${character.gender}<td>${character.house}<td>
        <button type="button" onclick= "addCharacter('${character.name}<td>${character.species}<td>${character.gender}<td>${character.house}')" class="btn btn-dark">Add</button>
        <td><i id="heart"class="far fa-heart" button type = "button" onclick= "likeButton('${heart}')"></i><td><img src="${character.image}"></img>`;
        document.querySelector('#all-characters').appendChild(list)
      })
      //Creating your own list from the Add function
      myList().then (characters =>{ //Favourite Character List
        characters.forEach (character => {
          let list = document.createElement('tr');
        list.innerHTML = `<td>${character.Details}<td>
        <button type="button" onclick= "deleteCharacter(${character.id})"class="btn btn-dark">Delete</button> 
        <td><input id="${character.id + '-note'}" class="form-control" type="text" value="${character.note}">
        <td><button type="button" onclick="characterNotes(${character.id})" class="btn btn-dark">Save</button>`;
        document.querySelector('#favourite-characters').appendChild(list)
        })
      })
  })



})

function myList () {
    return fetch ("http://localhost:3000/harryPotterList")
    .then(response =>response.json())
    .then(json => json);
}







function addCharacter(character) {  // Adding API data to our JSON server.
  return fetch ('http://localhost:3000/harryPotterList', {
    method:"POST",
    headers: {
      "Content-Type":"application/json", //sending a json file
      "Accept":"application/json", // accepting the json as a response
    },
    body: JSON.stringify({  //data we want to add into our database. Stringify as it only accepts string not javascript object.
        Details: character,
        note : ""
        
    }) 
  })
}       


function deleteCharacter(id) {  // Adding API data to our JSON server.
  return fetch (`http://localhost:3000/harryPotterList/${id}`, {
    method:"DELETE",
    
  })
}       

function characterNotes (id) {
      let character = documenct.getElementById(id + '-character').value;
      let note = document.getElementById(id+'-note').value;

      return fetch  (`http://localhost:3000/harryPotterList/${id}`, {
        method:"PUT",
        headers: {
          "Content-Type":"application/json", //sending a json file
        },
        body: JSON.stringify({
          character : character,
          note : note
          
        })
      })
}







//Like button
function likeButton() {
  const heart = document.getElementById('heart');
  heart.addEventListener('click', function() {
    heart.classList.toggle('red');
  });
  likeButton()
} ;


// autho0
let auth0 = null;

const fetchAuthConfig = () => fetch("/auth_config.json");


const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

window.onload = async () => {
  await configureClient();


updateUI();
}

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
  };

  const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

