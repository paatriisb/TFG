import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css"; // Asegúrate de que los estilos personalizados estén aquí

const Testimonios = () => {
  const navigate = useNavigate();
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

      {/* BOTONES DE CONTROL SUPERIOR */}
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

      {/* CARRUSEL DE TESTIMONIOS */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4 texto-morado">EXPERIENCIAS</h2>

        <div
          id="testimonioCarousel"
          className="carousel slide shadow rounded bg-white carousel-testimonios"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="d-flex flex-column align-items-center justify-content-center text-center p-5"
                style={{ minHeight: "300px" }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-3 icono-perfil-circulo">
                  <i className="bi bi-person-heart fs-1"></i>
                </div>
                <p className="lead fst-italic px-md-5">
                  "El apoyo mutuo me salvó. Escuchar a otras mujeres me hizo
                  entender que no estaba sola."
                </p>
                <h5 className="mt-2 mb-0 fw-bold">Ana R.</h5>
                <small className="text-muted">Víctima</small>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="d-flex flex-column align-items-center justify-content-center text-center p-5"
                style={{ minHeight: "300px" }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-3 icono-perfil-circulo">
                  <i className="bi bi-person-check fs-1"></i>
                </div>
                <p className="lead fst-italic px-md-5">
                  "Denunciar fue el paso más difícil, pero hoy vivo en paz. La
                  libertad no tiene precio."
                </p>
                <h5 className="mt-2 mb-0 fw-bold">María L.</h5>
                <small className="text-muted">Víctima</small>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonioCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon flecha-personalizada"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonioCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon flecha-personalizada"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      {/* REDES DE APOYO */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center fw-bold mb-2 texto-morado">
          TESTIMONIOS Y REDES DE APOYO
        </h2>
        <p className="text-center text-secondary mb-4">
          Conoce plataformas y mujeres referentes que ofrecen espacios seguros
          para compartir y sanar.
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 border-start border-4 borde-morado">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-megaphone-fill texto-morado fs-3 me-2"></i>
                  <h5 className="card-title fw-bold m-0">
                    Cristina Fallarás (#SeAcabó)
                  </h5>
                </div>
                <p className="card-text text-muted">
                  Iniciativa que recopila miles de testimonios reales para
                  romper el silencio y crear una memoria colectiva contra la
                  violencia.
                </p>
                <a
                  href="https://www.instagram.com/cfallaras/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-morado-personalizado mt-auto"
                >
                  <i className="bi bi-instagram me-2"></i>Ver testimonios
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 border-start border-4 borde-morado">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-people-fill texto-morado fs-3 me-2"></i>
                  <h5 className="card-title fw-bold m-0">Red de Sororidad</h5>
                </div>
                <p className="card-text text-muted">
                  Plataformas de apoyo mutuo donde mujeres comparten sus
                  procesos de sanación y ofrecen acompañamiento a otras.
                </p>
                <a
                  href="https://www.instagram.com/p/DUJ0mF2D2Nj/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-morado-personalizado mt-auto"
                >
                  <i className="bi bi-instagram me-2"></i>Ver en Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN FLOTANTE CHAT */}
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

export default Testimonios;
