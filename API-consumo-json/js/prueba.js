const url = "https://johnfredyb.github.io/mars-photos-api/mars_photos.json";

const galeria = document.getElementById("contenedor-personajes");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((foto) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const imagen = document.createElement("img");
      imagen.src = foto.img_src;
      imagen.alt = foto.id;

      const nombre = document.createElement("p");
      nombre.textContent = foto.description;

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(nombre);

      galeria.appendChild(tarjeta);
    });
  })
  .catch((e) => {
    console.log("error", e);
  });
