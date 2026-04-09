document.addEventListener("DOMContentLoaded", () => {
  // 1. Salida Rápida
  const botonX = document.querySelector(".btn-x-salir");
  if (botonX) {
    botonX.addEventListener("click", () => {
      window.location.replace("https://www.google.com");
      window.open("https://www.google.com", "_newtab");
    });
  }

  // 2. Modo Discreto
  const btnModo = document.querySelector(".btn-modo-discreto");
  const toggleModoDiscreto = () => {
    document.body.classList.toggle("modo-discreto");
    localStorage.setItem("modoDiscreto", document.body.classList.contains("modo-discreto"));
  };
  if (btnModo) btnModo.addEventListener("click", toggleModoDiscreto);
  if (localStorage.getItem("modoDiscreto") === "true") document.body.classList.add("modo-discreto");

  let pasoActual = 1;
  let womanLocation = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      womanLocation = [pos.coords.latitude, pos.coords.longitude];
    }, null, { enableHighAccuracy: true });
  }

  // 3. Cuestionario
  const preguntas = [
    "¿Estás en un lugar seguro ahora mismo?", "¿Necesitas asistencia médica urgente?", "¿El agresor está en la vivienda?",
    "¿El agresor tiene acceso a algún tipo de arma?", "¿Hay menores a tu cargo en este momento?", "¿Puedes hablar ahora mismo sin ser escuchada?",
    "¿Has sufrido violencia física hoy?", "¿Tienes heridas visibles?", "¿Conoces la dirección exacta donde te encuentras?",
    "¿Deseas que activemos el protocolo de intervención?"
  ];

  const preguntaTexto = document.getElementById("pregunta-texto");
  if (preguntaTexto) preguntaTexto.innerText = preguntas[0];

  // 4. Botón de Pánico
  const btnPanico = document.getElementById("BOTON-PANICO-REAL");
  if (btnPanico) {
    btnPanico.addEventListener("click", function () {
      Swal.fire({
        title: "¿ESTÁS SEGURA?",
        text: "Se enviará una patrulla de inmediato a tu ubicación actual.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff0000",
        confirmButtonText: "SÍ, ENVIAR AYUDA",
        cancelButtonText: "CANCELAR"
      }).then((result) => {
        if (result.isConfirmed) {
          // No cambiamos estilos, solo el texto
          btnPanico.innerText = "AYUDA EN CAMINO";
          
          if (!womanLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
              womanLocation = [pos.coords.latitude, pos.coords.longitude];
              activarMapaFijo();
            }, () => { activarMapaFijo(); }, { enableHighAccuracy: true });
          } else {
            activarMapaFijo();
          }
        }
      });
    });
  }

  // 5. Función de Mapa (Respetando tu HTML y CSS de Bootstrap)
  function activarMapaFijo() {
    const cont = document.getElementById("contenedor-fijo-mujer");
    if (cont) {
      cont.style.display = "block";
      // Usamos clases de Bootstrap (p-3, text-center) para no meter CSS manual
      cont.innerHTML = `
        <div class="p-3">
          <div id="mapa-real-mujer" style="height: 200px; border-radius: 10px;"></div>
          <div class="text-center mt-2">
            <strong style="color: #6f42c1;">📍 Localización confirmada.</strong>
            <p class="small mb-0">La patrulla está en camino. Por favor, rellena el cuestionario.</p>
          </div>
        </div>
      `;
      
      setTimeout(() => {
        let coords = womanLocation || [40.4167, -3.7037]; 
        let mapF = L.map("mapa-real-mujer").setView(coords, 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapF);
        
        let chicaIcon = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
          iconSize: [30, 30], iconAnchor: [15, 30]
        });
        
        L.marker(coords, { icon: chicaIcon }).addTo(mapF).bindPopup("ESTÁS AQUÍ").openPopup();
        setTimeout(() => { mapF.invalidateSize(); }, 200);
      }, 300);
    }
  }

  // 6. Lógica de Preguntas
  const btnSi = document.querySelector(".btn-si-morado");
  const btnNo = document.querySelector(".btn-no-gris");
  if (btnSi) btnSi.onclick = siguientePregunta;
  if (btnNo) btnNo.onclick = siguientePregunta;

  function siguientePregunta() {
    if (pasoActual < preguntas.length) {
      pasoActual++;
      preguntaTexto.innerText = preguntas[pasoActual - 1];
    } else {
      document.getElementById("seccion-cuestionario").style.display = "none";
      document.getElementById("seccion-ayuda").style.display = "block";
      const txtTiempo = document.getElementById("tiempo-random");
      if (txtTiempo) txtTiempo.innerText = "1";
      setTimeout(() => { dibujarMapaPatrullaReal(); }, 500);
    }
  }

  // 7. Mapa final
  async function dibujarMapaPatrullaReal() {
    const divM = document.getElementById("mapa-patrulla");
    const txtTiempo = document.getElementById("tiempo-random");
    if (!divM) return;
    divM.innerHTML = "";
    
    let coords = womanLocation || [40.4167, -3.7037];
    let mapP = L.map(divM).setView(coords, 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapP);
    
    setTimeout(() => { mapP.invalidateSize(); }, 200);

    let startLat = coords[0] - 0.005;
    let startLng = coords[1] - 0.005;
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${coords[1]},${coords[0]}?overview=full&geometries=geojson`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const coordinates = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
      L.polyline(coordinates, { color: '#6f42c1', weight: 4, opacity: 0.6, dashArray: '5, 10' }).addTo(mapP);

      let iconoPoli = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1172/1172407.png",
        iconSize: [35, 35], iconAnchor: [17, 17]
      });

      let marcadorCoche = L.marker(coordinates[0], { icon: iconoPoli }).addTo(mapP);
      let totalSteps = coordinates.length;
      let step = 0;
      let intervalTime = 60000 / totalSteps;

      let animacion = setInterval(() => {
        if (step < totalSteps) {
          marcadorCoche.setLatLng(coordinates[step]);
          step++;
          if (step > totalSteps * 0.85 && txtTiempo) txtTiempo.innerText = "0";
        } else {
          clearInterval(animacion);
          if (txtTiempo) txtTiempo.innerText = "0";
          marcadorCoche.bindPopup("<b>Patrulla en tu domicilio</b>").openPopup();
          Swal.fire({
            title: "¡AYUDA LLEGANDO!",
            text: "La policía está en tu ubicación actual.",
            icon: "info",
            confirmButtonColor: "#6f42c1",
            confirmButtonText: "ENTENDIDO"
          });
        }
      }, intervalTime);
    } catch (error) { console.error("Error ruta"); }
  }
});