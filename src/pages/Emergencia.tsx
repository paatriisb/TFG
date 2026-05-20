import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/servicios.css";

const Emergencia = () => {
  const navigate = useNavigate();

  // PREGUNTAS DE LA ENCUESTA
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

  // ESTADOS LOCALES Y REFERENCIAS
  const [numPregunta, setNumPregunta] = useState(0);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [direccionDetallada, setDireccionDetallada] = useState("");
  const [posicionChica, setPosicionChica] = useState<[number, number] | null>(
    null,
  );
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  const mapaMujerRef = useRef<HTMLDivElement>(null);
  const mapaMujer = useRef<L.Map | null>(null);
  const mapaPatrullaRef = useRef<HTMLDivElement>(null);
  const mapaPatrulla = useRef<L.Map | null>(null);

  // MODO DISCRETO: SINCRONIZACIÓN INICIAL AL CARGAR
  useEffect(() => {
    const modoGuardar = localStorage.getItem("modoDiscreto");
    if (modoGuardar === "true") {
      setModoDiscreto(true);
      document.body.classList.add("modo-discreto");
    }
  }, []);

  // MODO DISCRETO: APLICAR CLASES EN EL BODY EN TIEMPO REAL
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // MODO DISCRETO: ATAJO DE TECLADO RÁPIDO (CTRL + D)
  useEffect(() => {
    const atajoTeclado = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setModoDiscreto((prev) => !prev);
      }
    };

    window.addEventListener("keydown", atajoTeclado);
    return () => window.removeEventListener("keydown", atajoTeclado);
  }, []);

  // CERRAR SESIÓN POR INACTIVIDAD DE 3 MINUTOS
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
      }, 180000);
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

  // ACCIÓN: SALIDA RÁPIDA DE EMERGENCIA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // ACCIÓN: BOTÓN DE PÁNICO PRINCIPAL
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

    try {
      if (navigator.permissions) {
        await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
      }

      const coords = await obtenerUbicacion();
      setPosicionChica(coords);

      setTimeout(() => {
        crearMapaMujer(coords);
      }, 100);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudo obtener tu ubicación. Revisa los permisos del GPS.",
        "error",
      );
    }
  };

  // ACCIÓN: OBTENER COORDENADAS GPS DISPOSITIVO
  const obtenerUbicacion = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    });
  };

  // MAPAS: GENERACIÓN DEL MAPA DE UBICACIÓN DE LA USUARIA
  const crearMapaMujer = (coords: [number, number]) => {
    if (!mapaMujerRef.current) return;

    if (mapaMujer.current) {
      mapaMujer.current.remove();
      mapaMujer.current = null;
    }

    const map = L.map(mapaMujerRef.current).setView(coords, 16);
    mapaMujer.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    const iconoChica = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
      iconSize: [35, 35],
      iconAnchor: [17, 35],
    });

    L.marker(coords, { icon: iconoChica }).addTo(map);

    map.invalidateSize();
    setTimeout(() => {
      if (mapaMujer.current) {
        mapaMujer.current.invalidateSize();
      }
    }, 300);
  };

  // MAPAS: RUTA DINÁMICA Y ANIMACIÓN EN VIVO DE LA POLICÍA
  const dibujarMapaPatrulla = async () => {
    if (!mapaPatrullaRef.current) return;

    const coords = posicionChica || [40.4167, -3.7037];

    if (mapaPatrulla.current) {
      mapaPatrulla.current.remove();
      mapaPatrulla.current = null;
    }

    const map = L.map(mapaPatrullaRef.current).setView(coords, 15);
    mapaPatrulla.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map,
    );

    const iconoChica = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
      iconSize: [30, 30],
      iconAnchor: [17, 35],
    });

    L.marker(coords, { icon: iconoChica }).addTo(map);

    map.invalidateSize();
    setTimeout(() => {
      if (mapaPatrulla.current) {
        mapaPatrulla.current.invalidateSize();
      }
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

      const iconoPolicia = L.divIcon({
        className: "car-icon",
        html: `<div class="car">🚓</div>`,
        iconSize: [80, 80],
      });

      let marcador = L.marker(coordinates[0], { icon: iconoPolicia }).addTo(
        map,
      );

      const TIEMPO_TOTAL_MS = 60000;
      const FPS = 30;
      const totalPasosGlobales = (TIEMPO_TOTAL_MS / 1000) * FPS;
      const pasosPorTramo = totalPasosGlobales / (coordinates.length - 1);

      let i = 0;
      const moverCoche = () => {
        if (i < coordinates.length - 1) {
          const puntoInicio = coordinates[i];
          const puntoDestino = coordinates[i + 1];
          let contadorTramo = 0;

          const argumentoSuaveCoche = setInterval(() => {
            if (contadorTramo >= pasosPorTramo) {
              clearInterval(argumentoSuaveCoche);
              i++;
              moverCoche();
            } else {
              const progreso = contadorTramo / pasosPorTramo;
              const lat =
                puntoInicio[0] + (puntoDestino[0] - puntoInicio[0]) * progreso;
              const lng =
                puntoInicio[1] + (puntoDestino[1] - puntoInicio[1]) * progreso;
              marcador.setLatLng([lat, lng]);
              contadorTramo++;
            }
          }, 1000 / FPS);
        } else {
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

      moverCoche();
    } catch (error) {
      console.error("Error en la ruta:", error);
    }
  };

  return (
    <>
      {/* NAVEGADOR PRINCIPAL */}
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

          {/* BOTÓN COLAPSIBLE HAMBURGUESA */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* ENLACES DE MENÚ */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex w-100">
              <div className="nav-item text-center flex-fill">
                <span
                  className="nav-link text-white botonEmergencia"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/emergencia")}
                >
                  Emergencia
                </span>
              </div>

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

      {/* BOTONES SUPERIORES CABECERA */}
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

      {/* SECCIÓN INTERRUPTOR DE PÁNICO */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12 text-center">
            <button
              id="BOTON-PANICO-REAL"
              className="boton-panico w-100 py-3 fs-3 fw-bold"
              onClick={activarPanico}
            >
              EMERGENCIA
            </button>

            {/* MAPA DE LA CHICA CONFIRMADO */}
            {posicionChica && (
              <div className="contenedor-mapa-mujer mt-4 shadow-sm w-100">
                <div
                  ref={mapaMujerRef}
                  style={{
                    height: "200px",
                    minHeight: "200px",
                    width: "100%",
                    borderRadius: "10px",
                    backgroundColor: "#eee",
                  }}
                />
                <div className="text-center mt-3">
                  <strong style={{ color: "#6f42c1" }}>
                    📍 Localización confirmed
                  </strong>
                  <p className="small mb-0">
                    La patrulla está en camino. Por favor, rellena el
                    cuestionario.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECCIÓN CENTRAL: ENCUESTA O SEGUIMIENTO */}
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            {!mostrarMapa ? (
              <div className="card-servicio shadow card-emergencia-grande">
                <div className="card-servicio-header">
                  ENCUESTA DE SEGURIDAD
                </div>
                <div className="card-servicio-body text-center">
                  {numPregunta < preguntas.length - 1 ? (
                    <>
                      <h3 className="pregunta-emergencia mb-4">
                        {preguntas[numPregunta]}
                      </h3>
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-lg flex-fill py-3 fs-4 fw-bold text-white btn-si-morado"
                          onClick={() => setNumPregunta((prev) => prev + 1)}
                          disabled={!posicionChica}
                        >
                          SÍ
                        </button>
                        <button
                          className="btn btn-outline-dark btn-lg flex-fill py-3 fs-4 fw-bold btn-no-gris"
                          onClick={() => setNumPregunta((prev) => prev + 1)}
                          disabled={!posicionChica}
                        >
                          NO
                        </button>
                      </div>
                    </>
                  ) : numPregunta === preguntas.length - 1 ? (
                    <>
                      <h3 className="pregunta-emergencia text-danger fw-bold mb-3">
                        Detalles de tu Domicilio
                      </h3>
                      <p className="small text-muted mb-4">
                        Por favor, introduce los datos exactos que el GPS no
                        puede detectar (Piso, puerta, letra, bloque) antes del
                        paso final.
                      </p>
                      <div className="mb-4 text-start">
                        <input
                          type="text"
                          className="form-control form-control-lg border-danger text-center shadow-sm"
                          placeholder="Ej: Bloque 3, 4º Derecha, Puerta A"
                          value={direccionDetallada}
                          onChange={(e) =>
                            setDireccionDetallada(e.target.value)
                          }
                          style={{ fontSize: "1.1rem", fontWeight: "500" }}
                        />
                      </div>
                      <button
                        className="btn btn-danger btn-lg w-100 py-3 fs-4 fw-bold shadow"
                        onClick={() => setNumPregunta((prev) => prev + 1)}
                      >
                        CONTINUAR AL PASO FINAL
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="pregunta-emergencia mb-4">
                        {preguntas[preguntas.length - 1]}
                      </h3>
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-lg flex-fill py-3 fs-4 fw-bold text-white btn-si-morado"
                          onClick={() => {
                            setMostrarMapa(true);
                            setTimeout(() => {
                              dibujarMapaPatrulla();
                            }, 400);
                          }}
                        >
                          SÍ
                        </button>
                        <button
                          className="btn btn-outline-dark btn-lg flex-fill py-3 fs-4 fw-bold btn-no-gris"
                          onClick={() => {
                            Swal.fire(
                              "Protocolo",
                              "No se ha activado la patrulla de seguimiento.",
                              "info",
                            );
                          }}
                        >
                          NO
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* SECCIÓN RUTA POLICIAL EN VIVO */
              <div className="card-servicio shadow card-emergencia-grande">
                <div
                  className="card-servicio-header"
                  style={{ background: "#dc3545" }}
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

      {/* BOTÓN FLOTANTE AL CHAT DE ASISTENCIA */}
      <a href="/chat" className="text-decoration-none">
        <div className="iconoDelChat">
          <i className="bi bi-chat-dots-fill"></i>
        </div>
      </a>

      {/* PIE DE PÁGINA (FOOTER) */}
      <footer className="custom-footer pt-5 pb-4 mt-5">
        <div className="container text-center text-md-start">
          <div className="row text-center text-md-start">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold titulosDelFooter">
                Ayuda
              </h5>
              <p className="small">
                Plataforma de apoyo y recursos diseñada para ofrecer seguridad,
                información y acompañamiento profesional en momentos críticos.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 fw-bold titulosDelFooter">
                Servicios
              </h5>
              <p>
                <span
                  className="linksDelFooter"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/ayuda-legal")}
                >
                  Ayuda Legal
                </span>
              </p>
              <p>
                <span
                  className="linksDelFooter"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/psicologia")}
                >
                  Psicología
                </span>
              </p>
              <p>
                <span
                  className="linksDelFooter"
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
              <h5 className="text-uppercase mb-4 fw-bold titulosDelFooter">
                Síguenos
              </h5>
              <div className="d-flex justify-content-center justify-content-md-start">
                <a href="#" className="linksDelFooter mx-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="linksDelFooter mx-2">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="linksDelFooter mx-2">
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
                <strong className="titulosDelFooter">016SEGURO</strong>
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
