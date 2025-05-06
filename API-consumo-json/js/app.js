document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-gatos");

  fetch("datos.json")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al cargar los datos");
      }
      return respuesta.json();
    })
    .then((gatos) => {
      gatos.forEach((gato) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-gato";
        tarjeta.innerHTML = `
            <img src="${gato.img}" alt="${gato.raza}">
            <h2>${gato.raza}</h2>
            <p><strong>Origen:</strong> ${gato.origen}</p>
            <p>${gato.caracteristicas}</p>
          `;
        contenedor.appendChild(tarjeta);
      });
    })
    .catch((error) => {
      contenedor.innerHTML = "<p>Error al cargar las razas de gatos.</p>";
      console.error(error);
    });
});
