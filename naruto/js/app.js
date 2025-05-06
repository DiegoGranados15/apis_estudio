const url = "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json";

const galeria = document.getElementById("contenedor-personajes");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.personajes.forEach((personaje) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const imagen = document.createElement("img");
      imagen.src = personaje.imagen;
      imagen.alt = personaje.nombre;

      const nombre = document.createElement("p");
      nombre.textContent = personaje.nombre;

      const aldea = document.createElement("p");
      aldea.textContent = `Aldea: ${personaje.aldea}`;

      const rango = document.createElement("p");
      rango.textContent = `Rango: ${personaje.rango}`;

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(aldea);
      tarjeta.appendChild(rango);

      galeria.appendChild(tarjeta);
    });
  })
  .catch((e) => {
    console.log("error", e);
  });
