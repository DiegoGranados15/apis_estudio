// Elementos del DOM
const catsContainer = document.getElementById("catsContainer");
const loadButton = document.getElementById("loadCats");
const loadingElement = document.getElementById("loading");

// API Key
const apiKey =
  "live_CQGW4RvVCMlG3VHpXNPL7KI352ahcKEzusKDiRykBnd7JcYEnyvAFHoSVU62vU5H";

// URL de la API
const apiUrl =
  "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=" +
  apiKey;

// Función para cargar los gatos
async function loadCats() {
  try {
    // Mostrar indicador de carga
    loadingElement.style.display = "block";

    // Limpiar el contenedor de gatos
    catsContainer.innerHTML = "";

    // Hacer la petición a la API
    const response = await fetch(apiUrl);

    // Verificar si la petición fue exitosa
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    // Convertir la respuesta a JSON
    const cats = await response.json();

    // Ocultar indicador de carga
    loadingElement.style.display = "none";

    // Renderizar los gatos
    renderCats(cats);
  } catch (error) {
    // Mostrar error y ocultar indicador de carga
    console.error("Error al cargar los gatos:", error);
    loadingElement.style.display = "none";
    catsContainer.innerHTML = `<p class="error">Error al cargar los gatos: ${error.message}</p>`;
  }
}

// Función para renderizar los gatos
function renderCats(cats) {
  // Verificar si hay gatos
  if (!cats || cats.length === 0) {
    catsContainer.innerHTML = "<p>No se encontraron gatos.</p>";
    return;
  }

  // Crear un elemento para cada gato
  cats.forEach((cat) => {
    const catCard = document.createElement("div");
    catCard.className = "cat-card";

    const catImage = document.createElement("img");
    catImage.className = "cat-image";
    catImage.src = cat.url;
    catImage.alt = "Gato Bengalí";

    const catInfo = document.createElement("div");
    catInfo.className = "cat-info";

    const catId = document.createElement("p");
    catId.className = "cat-id";
    catId.textContent = `ID: ${cat.id}`;

    const catDimensions = document.createElement("p");
    catDimensions.className = "cat-dimensions";
    catDimensions.textContent = `${cat.width} x ${cat.height}`;

    // Agregar los elementos al DOM
    catInfo.appendChild(catId);
    catInfo.appendChild(catDimensions);

    catCard.appendChild(catImage);
    catCard.appendChild(catInfo);

    catsContainer.appendChild(catCard);
  });
}

// Agregar evento al botón para cargar gatos
loadButton.addEventListener("click", loadCats);

// Cargar gatos al iniciar la página
document.addEventListener("DOMContentLoaded", loadCats);
