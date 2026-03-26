// Función de salida rápida (botón X)
function salidaRapida() {
  // 1. Redirige a una página de Google
  window.location.replace("https://www.google.com");
  // 2. Como medida extra, abre una pestaña nueva con google para que la usuaria pueda cerrar la anteriors
  window.open("https://www.google.com", "_newtab");
}

// BUSCADOR
document.getElementById("buscador").addEventListener("keyup", function (e) {
  let busqueda = e.target.value.toLowerCase();
  let tarjetas = document.querySelectorAll(".row.g-4 .col-md-6");

  tarjetas.forEach((columna) => {
    let titulo = columna
      .querySelector(".card-servicio-header")
      .innerText.toLowerCase();
    if (titulo.includes(busqueda)) {
      columna.style.display = "block";
    } else {
      columna.style.display = "none";
    }
  });
});

// MODO DISCRETO
document.addEventListener("DOMContentLoaded", () => {
  const btnModo = document.querySelector(".btn-modo-discreto");

  if (btnModo) {
    btnModo.addEventListener("click", () => {
      document.body.classList.toggle("modo-discreto");
      localStorage.setItem(
        "modoDiscreto",
        document.body.classList.contains("modo-discreto"),
      );
    });
  }

  if (localStorage.getItem("modoDiscreto") === "true") {
    document.body.classList.add("modo-discreto");
  }

  // Atajo con control + D
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      document.body.classList.toggle("modo-discreto");
      localStorage.setItem(
        "modoDiscreto",
        document.body.classList.contains("modo-discreto"),
      );
    }
  });
});
