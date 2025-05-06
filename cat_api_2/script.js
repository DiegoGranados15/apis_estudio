// Elementos del DOM
const catsContainer = document.getElementById("catsContainer");
const loadingElement = document.getElementById("loading");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

// Variables de paginación
const catsPerPage = 6;
let currentPage = 1;
let allCats = [];

// API Key
const apiKey =
  "live_CQGW4RvVCMlG3VHpXNPL7KI352ahcKEzusKDiRykBnd7JcYEnyvAFHoSVU62vU5H";

// Función para cargar todos los gatos
async function loadAllCats() {
  try {
    loadingElement.style.display = "block";

    // Obtenemos más gatos para tener suficientes para las páginas
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=30&breed_ids=beng&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    allCats = await response.json();
    loadingElement.style.display = "none";

    // Mostramos la primera página
    showCurrentPage();
  } catch (error) {
    console.error("Error:", error);
    loadingElement.style.display = "none";
    catsContainer.innerHTML = `<p>Error al cargar los gatos: ${error.message}</p>`;
  }
}

// Función para mostrar la página actual
function showCurrentPage() {
  // Actualizar info de página
  pageInfo.textContent = `Página ${currentPage}`;

  // Calcular índices de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * catsPerPage;
  const endIndex = startIndex + catsPerPage;

  // Obtener los gatos para esta página
  const catsToShow = allCats.slice(startIndex, endIndex);

  // Limpiar el contenedor
  catsContainer.innerHTML = "";

  // Mostrar los gatos
  catsToShow.forEach((cat) => {
    const catCard = document.createElement("div");
    catCard.className = "cat-card";

    const catImage = document.createElement("img");
    catImage.className = "cat-image";
    catImage.src = cat.url;
    catImage.alt = "Gato";

    const catInfo = document.createElement("div");
    catInfo.className = "cat-info";
    catInfo.textContent = `ID: ${cat.id.substring(0, 6)}...`;

    catCard.appendChild(catImage);
    catCard.appendChild(catInfo);
    catsContainer.appendChild(catCard);
  });

  // Actualizar estado de los botones
  updatePaginationButtons();
}

// Actualizar el estado de los botones de paginación
function updatePaginationButtons() {
  const totalPages = Math.ceil(allCats.length / catsPerPage);

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

// Evento para ir a la página anterior
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showCurrentPage();
  }
});

// Evento para ir a la página siguiente
nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(allCats.length / catsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    showCurrentPage();
  }
});

// Cargar los gatos al iniciar la página
document.addEventListener("DOMContentLoaded", loadAllCats);
