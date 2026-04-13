import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const PrevencionSeguridad = () => {
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // --- LÓGICA MODO DISCRETO ---
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setModoDiscreto((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- FUNCIONES ---
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
  };

  // --- DATOS DE LAS TARJETAS ---
  const tarjetasPrevencion = [
    {
      titulo: "Consejos para detener señales de violencia o maltrato",
      puntos: [
        {
          negrita: "Identifica patrones:",
          texto:
            "Presta atención a conductas de control, celos excesivos o aislamiento de tus seres queridos.",
        },
        {
          negrita: "Confía en tu instinto:",
          texto:
            "Si una situación te hace sentir incómoda o en peligro, no ignores esa sensación.",
        },
        {
          negrita: "Busca apoyo:",
          texto:
            "Habla con personas de confianza o profesionales antes de que la situación escale.",
        },
        {
          negrita: "Líneas de ayuda:",
          texto:
            "Ten a mano los números de emergencia locales (016) que no dejan rastro en la factura.",
        },
      ],
    },
    {
      titulo: "Recomendaciones para mantener la seguridad en cualquier lugar",
      puntos: [
        {
          negrita: "Planifica rutas:",
          texto:
            "Conoce bien tus trayectos habituales y localiza lugares seguros como comercios abiertos o estaciones.",
        },
        {
          negrita: "Ubicación compartida:",
          texto:
            "Si te sientes insegura, comparte tu ubicación en tiempo real con alguien de total confianza.",
        },
        {
          negrita: "Entorno alerta:",
          texto:
            "Evita distracciones excesivas con el móvil o auriculares en zonas poco transitadas o mal iluminadas.",
        },
        {
          negrita: "Transporte seguro:",
          texto:
            "Prioriza transportes oficiales y, si usas taxis/VTC, envía el número de matrícula a un contacto.",
        },
      ],
    },
    {
      titulo: "Cómo construir y fortalecer tu red de apoyo de confianza",
      puntos: [
        {
          negrita: "Círculo cercano:",
          texto:
            "Identifica al menos a tres personas a las que puedas llamar en cualquier momento de crisis.",
        },
        {
          negrita: "Palabra clave:",
          texto:
            "Establece una 'palabra de emergencia' con tus amigos para avisar que necesitas ayuda inmediata sin dar detalles.",
        },
        {
          negrita: "Grupos de ayuda:",
          texto:
            "Infórmate sobre asociaciones locales o grupos de apoyo donde compartir experiencias de forma segura.",
        },
        {
          negrita: "Recursos públicos:",
          texto:
            "Localiza los centros de servicios sociales o puntos municipales de atención más cercanos.",
        },
      ],
    },
    {
      titulo: "Estrategias de autocuidado y fortalecimiento emocional",
      puntos: [
        {
          negrita: "Validación:",
          texto:
            "Reconoce que tus sentimientos son válidos y que no eres responsable de las acciones de los demás.",
        },
        {
          negrita: "Límites claros:",
          texto:
            "Aprende a decir 'no' y a establecer distancias físicas y emocionales cuando tu paz esté en riesgo.",
        },
        {
          negrita: "Atención profesional:",
          texto:
            "Considera acudir a terapia especializada para sanar secuelas y ganar herramientas de empoderamiento.",
        },
        {
          negrita: "Rutinas saludables:",
          texto:
            "Mantener hábitos de sueño y alimentación ayuda a tener la mente más clara para decidir.",
        },
      ],
    },
    {
      titulo: "Pasos para elaborar un plan de acción ante una emergencia",
      puntos: [
        {
          negrita: "Bolsa de emergencia:",
          texto:
            "Prepara una mochila pequeña con copias de documentos, algo de dinero y llaves de repuesto.",
        },
        {
          negrita: "Lugar seguro:",
          texto:
            "Identifica un lugar al que puedas acudir en cualquier momento (casa de familiar, comisaría o centro 24h).",
        },
        {
          negrita: "Carga de dispositivos:",
          texto:
            "Mantén tu teléfono siempre con batería y los números de emergencia en marcación rápida.",
        },
        {
          negrita: "Documentación:",
          texto:
            "Si es posible, guarda fotos de documentos en una cuenta en la nube con contraseña segura.",
        },
      ],
    },
    {
      titulo: "Guía de seguridad digital y protección de la privacidad",
      puntos: [
        {
          negrita: "Navegación segura:",
          texto:
            "Utiliza el 'modo incógnito' si compartes ordenador y borra el historial regularmente.",
        },
        {
          negrita: "Redes sociales:",
          texto:
            "Revisa la privacidad y evita publicar tu ubicación exacta en tiempo real.",
        },
        {
          negrita: "Contraseñas:",
          texto:
            "Usa claves robustas y diferentes; considera el uso de un gestor de contraseñas seguro.",
        },
        {
          negrita: "Evidencia digital:",
          texto:
            "Aprende a realizar capturas de pantalla de mensajes sospechosos como medida de respaldo.",
        },
      ],
    },
  ];

  // Filtrado reactivo
  const tarjetasFiltradas = tarjetasPrevencion.filter((tarjeta) =>
    tarjeta.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()),
  );

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

      {/* BARRA DE BÚSQUEDA Y BOTONES DE CONTROL */}
      <div className="colorFondo">
        <div className="container-fluid mt-3 px-2 px-md-4">
          <div className="d-flex justify-content-between align-items-center flex-nowrap gap-2">
            <div className="buscador-personalizado shadow-sm flex-grow-1">
              <div className="input-group h-100">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search" style={{ color: "#6f42c1" }}></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-1"
                  placeholder="Buscar consejos o guías..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end pe-md-4 flex-shrink-0">
              <button
                className="btn text-white me-2 btn-modo-discreto"
                onClick={() => setModoDiscreto(!modoDiscreto)}
              >
                Modo discreto
              </button>
              <button
                className="btn text-white btn-danger btn-panico"
                onClick={salidaRapida}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-4 mb-5">
        <h1 className="titulo-seccion">INFORMACIÓN - PREVENCIÓN Y SEGURIDAD</h1>
        <div className="row g-4 mt-2">
          {tarjetasFiltradas.length > 0 ? (
            tarjetasFiltradas.map((tarjeta, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card-servicio shadow h-100">
                  <div className="card-servicio-header">{tarjeta.titulo}</div>
                  <div className="card-servicio-body">
                    <ul>
                      {tarjeta.puntos.map((punto, idx) => (
                        <li key={idx}>
                          <strong>{punto.negrita}</strong> {punto.texto}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <p className="text-muted">
                No se encontraron resultados para "{terminoBusqueda}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* BOTON FLOTANTE CHAT */}
      <div
        className="chat-float"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/chat")}
      >
        <i className="bi bi-chat-dots-fill"></i>
      </div>

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
                © 2026 Todos los derechos reservados:{" "}
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

export default PrevencionSeguridad;
