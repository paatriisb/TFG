// 1. Configuración de la Salida Rápida (Botón X)
const botonX = document.querySelector(".btn-x-salir");
if (botonX) {
  botonX.addEventListener("click", salidaRapida);
}

function salidaRapida() {
  // Redirige en la misma pestaña
  window.location.replace("https://www.google.com");
  // Abre una nueva como medida extra
  window.open("https://www.google.com", "_newtab");
}

// 2. Configuración del Modo Discreto
const btnModo = document.querySelector(".btn-modo-discreto");

// Función para activar/desactivar el modo
const toggleModoDiscreto = () => {
  document.body.classList.toggle("modo-discreto");
  localStorage.setItem(
    "modoDiscreto",
    document.body.classList.contains("modo-discreto"),
  );
};

if (btnModo) {
  btnModo.addEventListener("click", toggleModoDiscreto);
}
