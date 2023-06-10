/*
make div/section in html called 'all catchphrases'
query selector on that id







function getCatchphrases() {
  const { payload } - change previous mentions
  allCatchphrases.innerHTML = "";?
  payload.forEach(renderComments)
}


*/

// import { application } from "express";

const url = "http://localhost:3000";

// assign variables to inputs

const submitButton = document.querySelector("button[type='submit']");
const newestName = document.querySelector("#newest-name");
const newestCatchphrase = document.querySelector("#newest-catchphrase");
const allCatchphrases = document.querySelector("#all-catchphrases");

// shows latest entry to the competition
async function loadData() {
  const response = await fetch(`${url}/api/users/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  // getting last entry in JSON file
  let lastOnArray = data.payload[data.payload.length - 1];
  console.log(lastOnArray);
  // displays latest entry
  newestName.innerHTML = `${lastOnArray.first_name} ${lastOnArray.last_name}`;
  newestCatchphrase.innerHTML = `${lastOnArray.catchphrase}`;
}

// function createCommentBox ({ id,first_name, last_name, catchphrase})
// create elements: article, h2, h3, button
// add inner text: for h2, h3, voting button
// append to article
// event listener on button
// return article

function createCommentBox({ id, first_name, last_name, catchphrase, upvotes }) {
  const article = document.createElement("article");
  article.setAttribute("class", "individual-catchphrases");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  const upVoteButton = document.createElement("button");
  const totalUpVotes = document.createElement("p");

  h2.innerText = `${first_name} ${last_name}`;
  h3.innerText = catchphrase;
  upVoteButton.innerText = "⬆️";

  upVoteButton.addEventListener("click", async () => {
    let getURL = `http://localhost:3000/api/users/${id}`;
    let option = { method: "GET" };
    const response = await fetch(getURL, option);
    const getData = await response.json();
    const newData = { ...getData.payload };
    newData.upvotes++;
    console.log(newData);

    let patchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    const patchResponse = await fetch(getURL, patchOption);
    const patchData = await patchResponse.json();
    console.log(patchData);
    console.log(patchData.payload.upvotes);
    totalUpVotes.innerText = `Upvotes: ${patchData.payload.upvotes}`;
    // async function updateText() {
    //   let newUpvotes = patchData.upvotes;
    //   console.log(newUpvotes);
    // }
    // updateText();
  });

  totalUpVotes.innerText = `Upvotes: ${upvotes}`;

  article.appendChild(h2);
  article.appendChild(h3);
  article.appendChild(upVoteButton);
  article.appendChild(totalUpVotes);
  /*
  function handleDeleteCard(event) {
    event.preventDefault();
    let deleteURL = `${url}/api/recipes/${id}`;
    let option = { method: "DELETE" };
    deleteRecipe(deleteURL, option);
  }

  async function deleteRecipe(deleteURL, option) {
    const response = await fetch(deleteURL, option);
    const data = await response.json();
    getRecipes();

    // event.target.parentNode.remove();
  }
*/

  // Get request to fetch the data object
  // Patch request to update the votes

  // Add one to upvote on each button click
  // async function addOneVote(id) {
  //   let getURL = `http://localhost:3000/api/users/${id}`;
  //   let option = { method: "GET" };
  //   const response = await fetch(getURL, option);
  //   const getData = await response.json;
  //   console.log(getData);
  //   console.log(id);

  //   // const upvotes = getData.upvotes;
  // }
  upVoteButton.addEventListener("click", (id) => addOneVote(id));

  return article;
}

// function renderComments(placeholder) {
//   const article - call createCommentBox(pla....)
//   append to all catchphrases
// }

function renderComments(placeholder) {
  const article = createCommentBox(placeholder);
  allCatchphrases.appendChild(article);
}

// function getCatchphrases() {
//   const { payload } - change previous mentions
//   allCatchphrases.innerHTML = "";?
//   payload.forEach(renderComments)
// }

async function displayCatchphrasesRandomly() {
  const response = await fetch(`${url}/api/users/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const { payload } = await response.json();

  payload.sort((a, b) => Math.random() - 0.5);
  //  randomise comment display

  allCatchphrases.innerHTML = "";
  payload.forEach(renderComments);
}

// shows all entries
async function loadAll() {
  const response = await fetch(`${url}/api/users/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
}

// function to save form content to an object:

function handleSubmit(event) {
  event.preventDefault();

  enterCatchphraseCompetiton();
}

function gatherFormData() {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const catchphrase = document.getElementById("catchphrase");
  const body = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    catchphrase: catchphrase.value,
  };
  console.log(body);
  return body;
}

async function enterCatchphraseCompetiton() {
  console.log(gatherFormData());
  const response = await fetch(`${url}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
  console.log(data);
  newestName.innerHTML = `${data.payload.first_name} ${data.payload.last_name}`;
  newestCatchphrase.innerHTML = `${data.payload.catchphrase}`;
}

submitButton.addEventListener("click", handleSubmit);

loadData();
displayCatchphrasesRandomly();
