document.addEventListener("DOMContentLoaded", () => {
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

  // Comprobar si estaba activo al cargar la página
  if (localStorage.getItem("modoDiscreto") === "true") {
    document.body.classList.add("modo-discreto");
  }

  // Atajo de teclado: Control + D
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      toggleModoDiscreto();
    }
  });

  let pasoActual = 1;
  let womanLocation = null;

  const preguntas = [
    "¿Estás en un lugar seguro ahora mismo?",
    "¿Necesitas asistencia médica urgente?",
    "¿El agresor está en la vivienda?",
    "¿El agresor tiene acceso a algún tipo de arma?",
    "¿Hay menores a tu cargo en este momento?",
    "¿Puedes hablar ahora mismo sin ser escuchada?",
    "¿Has sufrido violencia física hoy?",
    "¿Tienes heridas visibles?",
    "¿Conoces la dirección exacta donde te encuentras?",
    "¿Deseas que activemos el protocolo de intervención?",
  ];

  const preguntaTexto = document.getElementById("pregunta-texto");
  if (preguntaTexto) {
    preguntaTexto.innerText = preguntas[0];
  }

  const btnPanico = document.getElementById("BOTON-PANICO-REAL");

  if (btnPanico) {
    btnPanico.addEventListener("click", function () {
      Swal.fire({
        title: "¿ESTÁS SEGURA?",
        html: 'Se enviará una patrulla de inmediato.<div id="mapa-alert" style="height: 200px; margin-top:15px; border-radius:12px;"></div>',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff0000",
        confirmButtonText: "SÍ, ENVIAR AYUDA",
        willOpen: () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                womanLocation = [
                  position.coords.latitude,
                  position.coords.longitude,
                ];
                let m = L.map("mapa-alert").setView(womanLocation, 16);
                L.tileLayer(
                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                ).addTo(m);
                L.marker(womanLocation).addTo(m);
              },
              () => {
                console.log("Error al obtener ubicación");
              },
              { enableHighAccuracy: true },
            );
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          btnPanico.style.background = "black";
          btnPanico.innerText = "AYUDA EN CAMINO";
          const cont = document.getElementById("contenedor-fijo-mujer");
          if (cont) {
            cont.style.display = "block";
            cont.innerHTML = "";

            let latLng = womanLocation || [40.41, -3.7];
            let mapF = L.map(cont).setView(latLng, 16);
            L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ).addTo(mapF);

            let chicaIcon = L.icon({
              iconUrl:
                "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
              iconSize: [45, 45],
              iconAnchor: [22, 45],
            });
            L.marker(latLng, { icon: chicaIcon })
              .addTo(mapF)
              .bindPopup("<b>ESTÁS AQUÍ</b>");
          }
        }
      });
    });
  }

  const btnSi = document.querySelector(".btn-si-morado");
  const btnNo = document.querySelector(".btn-no-gris");

  function siguientePregunta() {
    if (pasoActual < preguntas.length) {
      pasoActual++;
      preguntaTexto.innerText = preguntas[pasoActual - 1];
      window.scrollBy({ top: 30, behavior: "smooth" });
    } else {
      document.getElementById("seccion-cuestionario").style.display = "none";
      document.getElementById("seccion-ayuda").style.display = "block";
      document.getElementById("tiempo-random").innerText =
        Math.floor(Math.random() * 10) + 5;
      dibujarMapaPatrulla();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  if (btnSi) btnSi.onclick = siguientePregunta;
  if (btnNo) btnNo.onclick = siguientePregunta;

  function dibujarMapaPatrulla() {
    const divM = document.getElementById("mapa-patrulla");
    if (!divM) return;
    divM.innerHTML = "";
    let centro = womanLocation || [40.41, -3.7];
    let mapP = L.map(divM).setView(centro, 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapP,
    );

    let iconoPoli = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1172/1172407.png",
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    let poliLat = centro[0] - 0.008;
    let poliLng = centro[1] - 0.008;
    let marcadorCoche = L.marker([poliLat, poliLng], { icon: iconoPoli }).addTo(
      mapP,
    );

    let frame = 0;
    let animacion = setInterval(function () {
      frame++;
      let actualLat = marcadorCoche.getLatLng().lat;
      let actualLng = marcadorCoche.getLatLng().lng;
      let movLat = actualLat + (centro[0] - actualLat) * 0.05;
      let movLng = actualLng + (centro[1] - actualLng) * 0.05;
      marcadorCoche.setLatLng([movLat, movLng]);
      if (frame >= 60) {
        clearInterval(animacion);
        marcadorCoche.bindPopup("<b>LLEGANDO</b>").openPopup();
      }
    }, 800);
  }
});
