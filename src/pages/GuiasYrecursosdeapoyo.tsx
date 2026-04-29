import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const GuiasYrecursosdeapoyo = () => {
  const navigate = useNavigate();

  // ESTADOS
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // MODO DISCRETO
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setModoDiscreto((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // SALIDA RÁPIDA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
  };

  const recursos = [
    {
      titulo: "Primeros Pasos: ¿Qué hacer?",
      tipo: "video",
      videoUrl: "https://www.youtube.com/embed/YpYpmPGXhV4",
      descripcion:
        "Un video corto que explica cómo romper el silencio de la violencia sexual.",
    },
    {
      titulo: "Plan de Seguridad Personal",
      tipo: "descarga",
      texto:
        "Descarga nuestra guía interactiva para crear un plan de salida seguro en caso de emergencia.",
      lista: [
        "Preparación de mochila de emergencia.",
        "Contactos clave y códigos de alerta.",
      ],
      link: "https://logrono.es/documents/20121/1034738/nuevaguiacovid.pdf",
      btnTexto: "Descargar PDF",
    },
    {
      titulo: "Cuidando tu Salud Mental",
      tipo: "podcast",
      texto:
        "Recursos para gestionar el miedo y la ansiedad durante el proceso.",
      lista: [
        "Ejercicios de respiración guiada.",
        "Podcast: 'Fortaleza y Resiliencia'.",
        "Directorio de psicólogas.",
      ],
      link: "https://open.spotify.com/episode/7HKv1np6WymqQCMOOWEg1A",
      btnTexto: "Escuchar Podcast",
    },
    {
      titulo: "Tu Maleta de Emergencia",
      tipo: "info",
      texto:
        "Tener preparados tus documentos y objetos básicos te permitirá actuar con más calma.",
      lista: [
        "DNI, libro de familia y cartillas.",
        "Efectivo fuera de cuentas compartidas.",
        "Medicación y recetas.",
      ],
      link: "https://interior.gencat.cat/web/.content/home/030_arees_dactuacio/seguretat/violencia_masclista_i_domestica/materials_sobre_violencia_masclista_i_domestica/documentacio_per_a_professionals/documentacio_sobre_violencia_masclista_i_domestica_per_a_professionals/mesures_d_autoproteccio_per_a_dones_que_pateixen_violencia_masclista/pdf/es_MESURES_AUTOPROTECCIO_DONES.pdf",
      btnTexto: "Ver Medidas",
    },
    {
      titulo: "Guía para Madres y Menores",
      tipo: "botones",
      texto:
        "Cómo explicar la situación a tus hijos y proteger su bienestar emocional.",
      botones: [
        {
          t: "Relatos terapéuticos",
          l: "https://psicoguias.com/relatos-terapeuticos/",
        },
        {
          t: "Guía para adolescentes",
          l: "https://unaf.org/wp-content/uploads/2020/07/Guia-para-adolescentes.pdf",
        },
      ],
    },
    {
      titulo: "Chat de Atención 24/7",
      tipo: "especial",
      texto:
        "Equipo de profesionales listo para escucharte de forma totalmente segura.",
      lista: [
        "Confidencial (sin rastro).",
        "Respuesta inmediata.",
        "Apoyo multidisciplinar.",
      ],
      btnTexto: "Abrir Chat de Apoyo",
      link: "/chat",
    },
  ];

  const filtrados = recursos.filter((r) =>
    r.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()),
  );

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
      <style>{`
        .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-bottom: 15px; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .btn-recurso { background-color: #6f42c1; color: white; border-radius: 20px; text-decoration: none; display: inline-block; padding: 5px 15px; font-size: 0.9rem; transition: 0.3s; border: none; }
        .btn-recurso:hover { background-color: #563d7c; color: white; }
      `}</style>

      {/* NAVEGADOR */}
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

      {/* BUSCADOR */}
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
                  placeholder="Buscar guías..."
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

      {/* CONTENIDO */}
      <div className="container mt-4 mb-5">
        <h1 className="titulo-seccion">GUÍAS Y RECURSOS DE APOYO</h1>
        <p className="text-muted">
          No estás sola. Aquí tienes herramientas prácticas para entender qué
          está pasando y cómo cuidarte.
        </p>

        <div className="row g-4 mt-2">
          {filtrados.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card-servicio shadow h-100">
                <div className="card-servicio-header">{item.titulo}</div>
                <div className="card-servicio-body">
                  {item.tipo === "video" && (
                    <div className="video-container">
                      <iframe
                        src={item.videoUrl}
                        title="Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {item.texto && <p>{item.texto}</p>}
                  {item.lista && (
                    <ul className="mb-3">
                      {item.lista.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {item.botones ? (
                    item.botones.map((b, i) => (
                      <a
                        key={i}
                        href={b.l}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-recurso mb-2 d-block text-center"
                      >
                        {b.t}
                      </a>
                    ))
                  ) : item.tipo === "especial" ? (
                    <button
                      onClick={() => {
                        if (item.link) {
                          navigate(item.link);
                        }
                      }}
                      className="btn-recurso w-100 shadow-sm"
                      style={{ background: "#25d366" }}
                    >
                      <i className="bi bi-chat-fill me-2"></i>
                      {item.btnTexto}
                    </button>
                  ) : (
                    item.btnTexto && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-recurso"
                      >
                        {item.tipo === "descarga" && (
                          <i className="bi bi-file-earmark-pdf me-2"></i>
                        )}
                        {item.btnTexto}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
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

export default GuiasYrecursosdeapoyo;
