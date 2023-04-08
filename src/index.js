const toyCollection = document.getElementById("toy-collection");
const toyForm = document.querySelector(".add-toy-form");

// Fetch Andy's Toys
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => toys.forEach((toy) => renderToy(toy)));
}

// Render Toy Card
function renderToy(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const toyName = document.createElement("h2");
  toyName.innerText = toy.name;

  const toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.src = toy.image;

  const toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} Likes`;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.innerText = "Like ❤️";
  likeButton.addEventListener("click", handleLike);

  toyCard.append(toyName, toyImage, toyLikes, likeButton);
  toyCollection.appendChild(toyCard);
}

// Add a New Toy
function handleAddToy(event) {
  event.preventDefault();
  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((toy) => renderToy(toy))
    .catch((error) => console.error(error));

  event.target.reset();
}

// Increase a Toy's Likes
function handleLike(event) {
  const toyId = event.target.id;
  const toyLikes = parseInt(event.target.previousElementSibling.innerText);
  const newLikes = toyLikes + 1;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newLikes,
    }),
  })
    .then((response) => response.json())
    .then((toy) => {
      event.target.previousElementSibling.innerText = `${toy.likes} Likes`;
    })
    .catch((error) => console.error(error));
}

// Initialize App
function init() {
  fetchToys();
  toyForm.addEventListener("submit", handleAddToy);
}

init();
