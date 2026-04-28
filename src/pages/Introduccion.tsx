import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const Introduccion = () => {
  const navigate = useNavigate();

  // Estado para el Modo Discreto
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // Efecto para la clase del body y localStorage
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // Efecto para el atajo CTRL + D
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

  // Función de salida rápida (Botón X)
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
  };

  return (
    <>
      {/* Navegador */}
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

      {/* Controles rápidos */}
      <div className="container-fluid mt-3 px-2 px-md-4">
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

      <div className="container mt-5 mb-5">
        <h1 className="titulo-seccion text-center mb-4" id="bienvenida"></h1>

        {/* Estadísticas */}
        <div className="row g-4 mt-4">
          <h2 className="text-center fw-bold mb-4 texto-morado">
            ESTADÍSTICAS RECIENTES
          </h2>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-calendar2-check fs-1 mb-2"></i>
              <h3 className="fw-bold">2023</h3>
              <p className="mb-2">
                <strong>48,700</strong> denuncias oficiales por violencia de
                género en España.
              </p>
              <p className="text-muted small">
                Fuente: Ministerio de Igualdad.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-calendar2-week fs-1 mb-2"></i>
              <h3 className="fw-bold">2024</h3>
              <p className="mb-2">
                <strong>50,300</strong> denuncias registradas hasta diciembre.
              </p>
              <p className="text-muted small">
                Incremento del 3.2% respecto a 2023.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-calendar2-day fs-1 mb-2"></i>
              <h3 className="fw-bold">2025</h3>
              <p className="mb-2">
                Más de <strong>22,000</strong> denuncias en los primeros 6
                meses.
              </p>
              <p className="text-muted small">Datos provisionales.</p>
            </div>
          </div>
        </div>

        {/* Consejos */}
        <div className="row mt-5 g-4">
          <h2 className="text-center fw-bold mb-4 texto-morado">
            CONSEJOS DE SEGURIDAD
          </h2>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-lock-fill fs-1 mb-2"></i>
              <h4 className="fw-bold">Protege tu información</h4>
              <p className="text-muted small">
                No compartas contraseñas ni datos personales.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-telephone-fill fs-1 mb-2"></i>
              <h4 className="fw-bold">Línea 016</h4>
              <p className="text-muted small">
                Atención 24h, todos los días del año.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 w-100 shadow border-0 text-center p-3">
              <i className="bi bi-people-fill fs-1 mb-2"></i>
              <h4 className="fw-bold">Busca apoyo</h4>
              <p className="text-muted small">
                Acude a servicios sociales o familiares de confianza.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Flotante que lleva al Chat.tsx */}
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

export default Introduccion;
