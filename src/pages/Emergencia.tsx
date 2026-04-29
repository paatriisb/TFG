import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/servicios.css";
import { useNavigate } from "react-router-dom";

const Emergencia = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [tiempo, setTiempo] = useState<number | null>(null);
  const [womanLocation, setWomanLocation] = useState<any>(null);

  const contenedorRef = useRef<HTMLDivElement>(null);
  const mapaPatrullaRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

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

  // ================= MODO DISCRETO =================
  useEffect(() => {
    if (localStorage.getItem("modoDiscreto") === "true") {
      document.body.classList.add("modo-discreto");
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleModo();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const toggleModo = () => {
    document.body.classList.toggle("modo-discreto");
    localStorage.setItem(
      "modoDiscreto",
      document.body.classList.contains("modo-discreto").toString(),
    );
  };

  // ================= SALIDA RÁPIDA =================
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // ================= BOTÓN PÁNICO =================
  const activarPanico = () => {
    Swal.fire({
      title: "¿ESTÁS SEGURA?",
      html: 'Se enviará una patrulla de inmediato.<div id="mapa-alert" style="height:200px;margin-top:15px;border-radius:12px;"></div>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      confirmButtonText: "SÍ, ENVIAR AYUDA",

      willOpen: () => {
        if (!navigator.geolocation) {
          Swal.showValidationMessage("Tu navegador no permite geolocalización");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc: [number, number] = [
              pos.coords.latitude,
              pos.coords.longitude,
            ];

            setWomanLocation(loc);

            const map = L.map("mapa-alert").setView(loc, 16);

            L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ).addTo(map);

            L.marker(loc).addTo(map);
          },

          (err) => {
            console.error(err);

            Swal.showValidationMessage(
              "No se pudo obtener tu ubicación real. Activa GPS y permisos.",
            );
          },

          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      },
    }).then((res) => {
      if (!res.isConfirmed) return;

      const cont = contenedorRef.current;
      if (!cont) return;

      cont.style.display = "block";
      cont.innerHTML = "";

      // 🔥 IMPORTANTE: usa GPS REAL si existe
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];

          const map = L.map(cont).setView(loc, 16);

          L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          ).addTo(map);

          const icon = L.icon({
            iconUrl:
              "https://cdn-icons-png.flaticon.com/512/11107/11107554.png",
            iconSize: [45, 45],
            iconAnchor: [22, 45],
          });

          L.marker(loc, { icon }).addTo(map).bindPopup("<b>ESTÁS AQUÍ</b>");
        },

        () => {
          Swal.fire("Error", "No se pudo obtener tu ubicación real", "error");
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  };

  // ================= CUESTIONARIO =================
  const siguientePregunta = () => {
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1);
      window.scrollBy({ top: 30, behavior: "smooth" });
    } else {
      setMostrarAyuda(true);
      setTiempo(2);
      setTimeout(dibujarMapaPatrulla, 300);
    }
  };

  // ================= MAPA PATRULLA =================
  const dibujarMapaPatrulla = () => {
    const div = mapaPatrullaRef.current;
    if (!div) return;

    div.innerHTML = "";

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const centro: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        const map = L.map(div).setView(centro, 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          map,
        );

        // 🚓 ICONO MÁS PEQUEÑO (COCHE PATRULLA)
        const icono = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048310.png",
          iconSize: [30, 30], // 👈 más pequeño
          iconAnchor: [15, 15],
        });

        // posición inicial ligeramente alejada
        let marker = L.marker([centro[0] - 0.002, centro[1] - 0.002], {
          icon: icono,
        }).addTo(map);

        let frame = 0;

        let anim = setInterval(() => {
          frame++;

          let current = marker.getLatLng();

          // 🚨 movimiento suave (NO “vuela”)
          let newLat = current.lat + (centro[0] - current.lat) * 0.08;
          let newLng = current.lng + (centro[1] - current.lng) * 0.08;

          marker.setLatLng([newLat, newLng]);

          if (frame >= 60) {
            clearInterval(anim);
            marker.bindPopup("<b>LLEGANDO</b>").openPopup();
          }
        }, 300);
      },

      () => {
        console.log("No se pudo obtener ubicación para patrulla");
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
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
      {/* Navegador */}
      <nav
        className="navbar navbar-expand-sm navbar-dark"
        style={{ backgroundColor: "#6f42c1" }}
      >
        <div className="container-fluid d-flex p-0">
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

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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

      {/* --- BOTONES SUPERIORES  */}
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
            style={{ background: "linear-gradient(90deg, #ff4c4c, #ff0000)" }}
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      {/* BOTÓN EMERGENCIA */}
      <div className="text-center mb-4">
        <button
          id="BOTON-PANICO-REAL"
          onClick={activarPanico}
          style={{
            padding: "30px 80px",
            fontSize: "40px",
            fontWeight: "900",
            color: "white",
            background: "#ff0000",
            border: "6px solid white",
            borderRadius: "15px",
          }}
        >
          EMERGENCIA
        </button>
      </div>

      {/* MAPA */}
      <div className="d-flex justify-content-center mb-5">
        <div
          className="card shadow"
          style={{
            width: "350px",
            borderRadius: "20px",
            border: "3px solid #6f42c1",
          }}
        >
          <div className="card-body p-0">
            <div
              ref={contenedorRef}
              style={{
                display: "none",
                width: "100%",
                height: "320px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= CUESTIONARIO CON CARD ================= */}
      {!mostrarAyuda ? (
        <div className="d-flex justify-content-center">
          <div
            className="card shadow"
            style={{
              width: "450px",
              borderRadius: "25px",
              border: "6px solid #6f42c1",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <h4 className="mb-4">{preguntas[pasoActual]}</h4>

            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn"
                style={{
                  backgroundColor: "#6f42c1",
                  color: "white",
                  fontWeight: "700",
                  borderRadius: "12px",
                  padding: "10px 30px",
                }}
                onClick={siguientePregunta}
              >
                SÍ
              </button>

              <button
                className="btn btn-outline-dark"
                style={{
                  borderRadius: "12px",
                  padding: "10px 30px",
                  fontWeight: "700",
                }}
                onClick={siguientePregunta}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3>AYUDA EN CAMINO</h3>

          <div className="alert alert-warning mt-3">
            Patrulla más cercana: {tiempo} min
          </div>

          <div
            ref={mapaPatrullaRef}
            style={{ height: "320px", marginTop: "20px" }}
          />
        </div>
      )}

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
