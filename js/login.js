document.addEventListener("DOMContentLoaded", () => {
  // --- 1. FUNCIONES DE SEGURIDAD (COMPAÑERA) ---
  // 1. Configuración de la Salida Rápida (Botón X)
  const botonX = document.querySelector(".btn-x-salir");
  if (botonX) {
    botonX.addEventListener("click", salidaRapida);
  }

  // Función de salida rápida (botón X)

  function salidaRapida() {
    // Redirige en la misma pestaña
    window.location.replace("https://www.google.com");
    // Abre una nueva como medida extra
    window.open("https://www.google.com", "_newtab");
  }

  // Lógica Modo Discreto
  const btnModo = document.querySelector(".btn-modo-discreto");
  const toggleModo = () => {
    document.body.classList.toggle("modo-discreto");
    localStorage.setItem(
      "modoDiscreto",
      document.body.classList.contains("modo-discreto"),
    );
  };

  if (btnModo) {
    btnModo.addEventListener("click", toggleModo);
  }

  if (localStorage.getItem("modoDiscreto") === "true") {
    document.body.classList.add("modo-discreto");
  }

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      toggleModo();
    }
  });

  // --- 2. TU LÓGICA DE LOGIN ---

  // Bloqueo de menús (si existieran links de navegación)
  const linksMenu = document.querySelectorAll(".nav-link");
  linksMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Acceso denegado",
        text: "Debes iniciar sesión primero.",
        icon: "warning",
        confirmButtonColor: "#6f42c1",
      });
    });
    link.style.cursor = "not-allowed";
  });

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!loginForm.checkValidity()) {
        e.stopPropagation();
        loginForm.classList.add("was-validated");
        return;
      }

      const emailGuardado = localStorage.getItem("emailRegistrado");
      const passGuardada = localStorage.getItem("passRegistrada");
      const emailInput = document.getElementById("emailInput").value;
      const passInput = document.getElementById("passInput").value;

      if (emailInput === emailGuardado && passInput === passGuardada) {
        localStorage.setItem("usuario", "Patrii");
        Swal.fire({
          title: "¡Bienvenida!",
          text: "Sesión iniciada correctamente.",
          icon: "success",
          confirmButtonColor: "#6f42c1",
        }).then(() => {
          window.location.href = "introduccion.html";
        });
      } else {
        Swal.fire({
          title: "Error de acceso",
          text: "Correo o contraseña incorrectos.",
          icon: "error",
          confirmButtonColor: "#6f42c1",
        });
      }
    });
  }

  // Botón ir a Registro
  const btnIrRegistro = document.getElementById("btnIrRegistro");
  if (btnIrRegistro) {
    btnIrRegistro.addEventListener("click", () => {
      window.location.href = "registro.html";
    });
  }
});
