// Función de salida rápida (botón X)
function salidaRapida() {
  // 1. Redirige a una página de Google
  window.location.replace("https://www.google.com");
  // 2. Como medida extra, abre una pestaña nueva con google para que la usuaria pueda cerrar la anteriors
  window.open("https://www.google.com", "_newtab");
}

// EDITAR PERFIL
document.addEventListener("DOMContentLoaded", function () {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioGuardado) {
    document.getElementById("nombreUsuario").value = usuarioGuardado.nombre;
    document.getElementById("emailUsuario").value = usuarioGuardado.email;
    document.getElementById("navUsuario").textContent = usuarioGuardado.nombre;
  }

  document
    .getElementById("formPerfil")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = document.getElementById("nombreUsuario").value;
      const email = document.getElementById("emailUsuario").value;
      const password = document.getElementById("passwordUsuario").value;
      const usuarioActualizado = {
        nombre: nombre,
        email: email,
        password: password,
      };
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      document.getElementById("navUsuario").textContent = nombre;
      alert("Perfil actualizado correctamente");
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
