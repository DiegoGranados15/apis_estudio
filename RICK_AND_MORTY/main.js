const apiUrl = "https://rickandmortyapi.com/api/character";

function createCard(character) {
  const { name, status, image } = character;

  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h5");
  title.textContent = name;

  const characterImage = document.createElement("img");
  characterImage.src = image;
  characterImage.alt = `Imagen de ${name}`;

  const characterStatus = document.createElement("p");
  characterStatus.textContent = status;
  characterStatus.classList.add("status");

  // Agregar clase según el estado
  if (status === "Alive") characterStatus.classList.add("alive");
  else if (status === "Dead") characterStatus.classList.add("dead");
  else characterStatus.classList.add("unknown");

  card.append(title, characterImage, characterStatus);

  return card;
}

async function fetchCharacters() {
  try {
    const response = await fetch(apiUrl);
    const { results } = await response.json();

    const cardsContainer = document.querySelector(".cards-container");
    results.forEach((character) => {
      const card = createCard(character);
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

// Llamar a la API al cargar la página
fetchCharacters();

//ANTIGUO
// const apiUrl = "https://rickandmortyapi.com/api/character";

// function makeCard(character) {
//   const { name, status, image } = character;
//   const cardsContainer = document.querySelector(".cards-container");

//   const title = document.createElement("h5");
//   title.textContent = name;

//   const characterStatus = document.createElement("p");
//   characterStatus.textContent = status;
//   if (status == "Alive") characterStatus.style.color = "green";
//   else characterStatus.style.color = "gray";

//   const characterImage = document.createElement("img");
//   characterImage.src = image;
//   characterImage.width = 200;

//   const Card = document.createElement("div");
//   Card.appendChild(title);
//   Card.appendChild(characterImage);
//   Card.appendChild(characterStatus);
//   Card.style.background = "blue";

//   cardsContainer.appendChild(Card);
// }

// async function getCharacters() {
//   try {
//     const response = await fetch(apiUrl);
//     const { results } = await response.json();
//     //console.log(results);

//     for (let i = 0; i < results.length; i++) {
//       makeCard(results[i]);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCharacters();
