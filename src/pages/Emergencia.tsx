import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/servicios.css";
import { useNavigate } from "react-router-dom";

const Emergencia = () => {
  const navigate = useNavigate();

  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  const [womanLocation, setWomanLocation] = useState<[number, number] | null>(
    null,
  );

  const mapaMujerRef = useRef<HTMLDivElement>(null);
  const mapaPatrullaRef = useRef<HTMLDivElement>(null);

  const mapaMujerInstancia = useRef<L.Map | null>(null);
  const mapaPatrullaInstancia = useRef<L.Map | null>(null);

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

  // =========================
  // MODO DISCRETO
  // =========================
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }

    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // =========================
  // SALIDA RÁPIDA
  // =========================
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // =========================
  // GEOLOCALIZACIÓN
  // =========================
  const obtenerUbicacion = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => reject(err),
        {
          enableHighAccuracy: true, // Lo mantenemos pero con un timeout agresivo
          timeout: 5000, // Si en 5 segundos no sale, corta
          maximumAge: 0,
        },
      );
    });
  };
  // =========================
  // BOTÓN PÁNICO
  // =========================
  const activarPanico = async () => {
    const result = await Swal.fire({
      title: "¿ESTÁS SEGURA?",
      text: "Se enviará una patrulla de inmediato a tu ubicación actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      confirmButtonText: "SÍ, ENVIAR AYUDA",
      cancelButtonText: "CANCELAR",
    });

    if (!result.isConfirmed) return;

    // Lanzamos la petición de ubicación
    try {
      const coords = await obtenerUbicacion();

      // Seteamos el estado para que aparezca el div del mapa
      setWomanLocation(coords);

      // Usamos requestAnimationFrame en lugar de setTimeout.
      // Es mucho más rápido porque espera al siguiente "dibujado" del navegador.
      requestAnimationFrame(() => {
        crearMapaMujer(coords);
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudo obtener tu ubicación. Revisa los permisos del GPS.",
        "error",
      );
    }
  };

  // =========================
  // MAPA MUJER
  // =========================
  const crearMapaMujer = (coords: [number, number]) => {
    if (!mapaMujerRef.current) return;

    if (mapaMujerInstancia.current) {
      mapaMujerInstancia.current.remove();
    }

    const map = L.map(mapaMujerRef.current).setView(coords, 16);

    mapaMujerInstancia.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    const chicaIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
      iconSize: [35, 35],
      iconAnchor: [17, 35],
    });

    L.marker(coords, { icon: chicaIcon }).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  };

  // =========================
  // SIGUIENTE PREGUNTA
  // =========================
  const siguientePregunta = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual((prev) => prev + 1);
    } else {
      setMostrarAyuda(true);

      setTimeout(() => {
        dibujarMapaPatrulla();
      }, 400);
    }
  };

  // =========================
  // MAPA PATRULLA (CORREGIDO)
  // =========================
  const dibujarMapaPatrulla = async () => {
    if (!mapaPatrullaRef.current) return;

    const coords = womanLocation || [40.4167, -3.7037];

    if (mapaPatrullaInstancia.current) {
      mapaPatrullaInstancia.current.remove();
    }

    const map = L.map(mapaPatrullaRef.current).setView(coords, 15);
    mapaPatrullaInstancia.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    const chicaIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
      iconSize: [30, 30],
      iconAnchor: [17, 35],
    });

    L.marker(coords, { icon: chicaIcon }).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    let startLat = coords[0] - 0.005;
    let startLng = coords[1] - 0.005;

    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${coords[1]},${coords[0]}?overview=full&geometries=geojson&steps=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const coordinates = data.routes[0].geometry.coordinates.map(
        (c: number[]) => [c[1], c[0]],
      );

      const iconoPoli = L.divIcon({
        className: "car-icon",
        html: `<div class="car">🚓</div>`,
        iconSize: [80, 80],
      });

      let marcador = L.marker(coordinates[0], { icon: iconoPoli }).addTo(map);

      // CONFIGURACIÓN DEL TIEMPO (1 MINUTO EXACTO)
      const TIEMPO_TOTAL_MS = 60000; // 60 segundos
      const FPS = 30; // Cuadros por segundo para suavidad
      const totalPasosGlobales = (TIEMPO_TOTAL_MS / 1000) * FPS;
      const pasosPorTramo = totalPasosGlobales / (coordinates.length - 1);

      let i = 0;
      const animarCoche = () => {
        if (i < coordinates.length - 1) {
          const puntoInicio = coordinates[i];
          const puntoDestino = coordinates[i + 1];
          let pasoActualEnTramo = 0;

          const intervaloSuave = setInterval(() => {
            if (pasoActualEnTramo >= pasosPorTramo) {
              clearInterval(intervaloSuave);
              i++;
              animarCoche();
            } else {
              const progreso = pasoActualEnTramo / pasosPorTramo;
              const lat =
                puntoInicio[0] + (puntoDestino[0] - puntoInicio[0]) * progreso;
              const lng =
                puntoInicio[1] + (puntoDestino[1] - puntoInicio[1]) * progreso;
              marcador.setLatLng([lat, lng]);
              pasoActualEnTramo++;
            }
          }, 1000 / FPS);
        } else {
          // LLEGADA AL DESTINO
          marcador.bindPopup("<b>Patrulla en tu domicilio</b>").openPopup();
          Swal.fire({
            title: "¡AYUDA LLEGANDO!",
            text: "La policía está en tu ubicación actual.",
            icon: "info",
            confirmButtonColor: "#6f42c1",
            confirmButtonText: "ENTENDIDO",
          });
        }
      };

      animarCoche();
    } catch (error) {
      console.error("Error en la ruta:", error);
    }
  };

  // CERRAR SESIÓN POR INACTIVIDAD DE 1 MINUTO
  useEffect(() => {
    let timeout: number;

    const logout = () => {
      localStorage.clear();
      window.location.replace("https://www.google.com");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        logout();
      }, 60000); // LE PONEMOS 1 MINUTO
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* ================= NAVBAR COMPLETO ================= */}
      <nav
        className="navbar navbar-expand-sm navbar-dark"
        style={{ backgroundColor: "#6f42c1" }}
      >
        <div className="container-fluid d-flex p-0">
          {/* LOGO */}
          <div className="nav-item text-center flex-fill">
            <div
              className="navbar-brand text-white"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/introduccion")}
            >
              <img
                src="logo.png"
                alt="Logo"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* CONTENIDO NAVBAR */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex w-100">
              {/* EMERGENCIA */}
              <div className="nav-item text-center flex-fill">
                <span
                  className="nav-link text-white botonEmergencia"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/emergencia")}
                >
                  Emergencia
                </span>
              </div>

              {/* SERVICIOS */}
              <div className="nav-item dropdown text-center flex-fill">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Servicios
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/ayudaLegal")}
                    >
                      Ayuda legal
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/psicologia")}
                    >
                      Psicología
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/centrosAcogida")}
                    >
                      Centros de acogida
                    </span>
                  </li>
                </ul>
              </div>

              {/* INFORMACIÓN */}
              <div className="nav-item dropdown text-center flex-fill">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Información
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/prevencion")}
                    >
                      Prevención y seguridad
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/derechosLegislacion")}
                    >
                      Derechos y legislación
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/guiasYrecursosdeapoyo")}
                    >
                      Guías y recursos de apoyo
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/testimonios")}
                    >
                      Testimonios y experiencias
                    </span>
                  </li>
                </ul>
              </div>

              {/* PERFIL */}
              <div className="nav-item dropdown text-center flex-fill">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person"></i>
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/perfil")}
                    >
                      Editar perfil
                    </span>
                  </li>

                  <li>
                    <span
                      className="dropdown-item text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/cerrarSesion")}
                    >
                      Cerrar sesión
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* BOTONES */}
      <div className="container-fluid mt-3 px-2 px-md-4">
        <div className="d-flex justify-content-end pe-md-4 flex-shrink-0">
          <button
            className="btn text-white me-2 btn-modo-discreto"
            onClick={() => setModoDiscreto(!modoDiscreto)}
          >
            Modo discreto
          </button>

          <button
            className="btn text-white btn-danger btn-x-salir"
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      {/* BOTÓN EMERGENCIA */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <button
              id="BOTON-PANICO-REAL"
              className="boton-panico w-50 py-3 fs-3 fw-bold"
              onClick={activarPanico}
            >
              EMERGENCIA
            </button>

            {womanLocation && (
              <div className="col-lg-5 mx-auto">
                <div className="contenedor-mapa-mujer mt-4 shadow-sm">
                  <div
                    ref={mapaMujerRef}
                    style={{
                      height: "200px",
                      minHeight: "200px", // Añade esto
                      width: "100%", // Asegura el ancho
                      borderRadius: "10px",
                      backgroundColor: "#eee", // Color de fondo mientras carga el mapa
                    }}
                  />

                  <div className="text-center mt-3">
                    <strong style={{ color: "#6f42c1" }}>
                      📍 Localización confirmada.
                    </strong>

                    <p className="small mb-0">
                      La patrulla está en camino. Por favor, rellena el
                      cuestionario.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CUESTIONARIO */}
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            {!mostrarAyuda ? (
              <div className="card-servicio shadow card-emergencia-grande">
                <div className="card-servicio-header">
                  ENCUESTA DE SEGURIDAD
                </div>

                <div className="card-servicio-body text-center">
                  <h3 className="pregunta-emergencia">
                    {preguntas[pasoActual]}
                  </h3>

                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-lg flex-fill py-3 fs-4 fw-bold text-white btn-si-morado"
                      onClick={siguientePregunta}
                      disabled={!womanLocation}
                    >
                      SÍ
                    </button>

                    <button
                      className="btn btn-outline-dark btn-lg flex-fill py-3 fs-4 fw-bold btn-no-gris"
                      onClick={siguientePregunta}
                      disabled={!womanLocation}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-servicio shadow card-emergencia-grande">
                <div
                  className="card-servicio-header"
                  style={{
                    background: "#dc3545",
                  }}
                >
                  AYUDA EN CAMINO
                </div>

                <div className="card-servicio-body">
                  <div className="alert alert-warning text-center fw-bold fs-4 mb-4">
                    Patrulla más cercana: 1 min
                  </div>

                  <p className="fw-bold fs-5 mb-3">RECOMENDACIONES</p>

                  <ul className="lista-emergencia">
                    <li>
                      <i className="bi bi-circle-fill punto-rojo"></i>
                      Mantén la calma y respira profundamente.
                    </li>

                    <li>
                      <i className="bi bi-circle-fill punto-rojo"></i>
                      Cierra puertas o busca un refugio seguro.
                    </li>

                    <li>
                      <i className="bi bi-circle-fill punto-rojo"></i>
                      Deja la línea libre para contactar con la policía.
                    </li>
                  </ul>
                  <div
                    ref={mapaPatrullaRef}
                    className="mapa-patrulla mt-4 shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CHAT */}
      <a href="/chat" className="text-decoration-none">
        <div className="chat-float">
          <i className="bi bi-chat-dots-fill"></i>
        </div>
      </a>

      {/* FOOTER COMPLETO */}
      <footer className="custom-footer pt-5 pb-4 mt-5">
        <div className="container text-center text-md-start">
          <div className="row text-center text-md-start">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold text-info">Ayuda</h5>
              <p className="small">
                Plataforma de apoyo y recursos diseñada para ofrecer seguridad,
                información y acompañamiento profesional en momentos críticos.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold text-info">
                Servicios
              </h5>
              <p>
                <span
                  className="footer-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/ayuda-legal")}
                >
                  Ayuda Legal
                </span>
              </p>
              <p>
                <span
                  className="footer-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/psicologia")}
                >
                  Psicología
                </span>
              </p>
              <p>
                <span
                  className="footer-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/centros-acogida")}
                >
                  Centros
                </span>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold text-danger">
                Emergencias 24/7
              </h5>
              <p className="small">
                <i className="bi bi-telephone-fill me-2"></i> Teléfono: 016
              </p>
              <p className="small">
                <i className="bi bi-whatsapp me-2"></i> WhatsApp: 600 000 016
              </p>
              <p className="small">
                <i className="bi bi-envelope-fill me-2"></i>{" "}
                consultas@igualdad.gob.es
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold text-info">
                Síguenos
              </h5>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="#" className="footer-link mx-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="footer-link mx-2">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="footer-link mx-2">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <hr className="mb-4 mt-4" />

          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <p className="small">
                ©️ 2026 Todos los derechos reservados:{" "}
                <strong className="text-info">016SEGURO</strong>
              </p>
            </div>
            <div className="col-md-5 col-lg-4 text-center text-md-end">
              <p className="small">
                Diseñado con <i className="bi bi-heart-fill text-danger"></i>{" "}
                por la comunidad.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Emergencia;
