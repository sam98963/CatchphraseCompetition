const url = "http://localhost:3000";

// assign variables to inputs

const submitButton = document.querySelector("button[type='submit']");
const newestName = document.querySelector("#newest-name");
const newestCatchphrase = document.querySelector("#newest-catchphrase");

async function loadNewest() {
  const response = await fetch(`${url}/api/users/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  let lastOnArray = data.payload[data.payload.length - 1];
  console.log(lastOnArray);

  newestName.innerHTML = `${lastOnArray.first_name} ${lastOnArray.last_name}`;
  newestCatchphrase.innerHTML = `${lastOnArray.catchphrase}`;
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

loadNewest();
