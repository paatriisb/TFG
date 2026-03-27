document.addEventListener("DOMContentLoaded", () => {
  const formRecuperar = document.getElementById("form-recuperar");
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
  if (formRecuperar) {
    formRecuperar.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const emailInput = document.getElementById("email-recuperar");
      const emailValue = emailInput.value;

      // EXPRESIÓN REGULAR: Comprueba que tenga texto + @ + texto + . + al menos 3 letras al final
      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3,}$/;

      // 1. Validar si está vacío (Bootstrap)
      if (!formRecuperar.checkValidity()) {
        formRecuperar.classList.add("was-validated");
        return;
      }

      // 2. Validar formato estricto (SweetAlert2)
      if (!emailPattern.test(emailValue)) {
        Swal.fire({
          title: "Correo no válido",
          text: "El email que has puesto no es correcto. Vuelve a escribirlo (ejemplo@correo.com).",
          icon: "error",
          confirmButtonColor: "#6f42c1",
          confirmButtonText: "Corregir",
        });
        return;
      }

      // 3. Si todo está bien, enviar
      formRecuperar.classList.add("was-validated");

      Swal.fire({
        title: "¡Correo enviado!",
        text: "Se ha enviado un correo de recuperación a: " + emailValue,
        icon: "success",
        confirmButtonColor: "#6f42c1",
        confirmButtonText: "Entendido",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "login.html";
        }
      });
    });
  }
});
