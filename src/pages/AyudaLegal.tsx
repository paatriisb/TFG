import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/servicios.css";

const AyudaLegal = () => {
  const navigate = useNavigate();

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

  // SALIDA RÁPIDA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
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

      {/* BOTONES DEBAJO DEL NAVEGADOR */}
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

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-4 mb-5">
        <h1 className="titulo-seccion">SERVICIOS - AYUDA LEGAL</h1>
        <div className="row g-4 mt-2">
          <div className="col-md-6 col-lg-4">
            <div className="card-servicio shadow">
              <div className="card-servicio-header">Penal</div>
              <div className="card-servicio-body">
                <ul>
                  <li>
                    <strong>Nombre:</strong> Ana Pérez
                  </li>
                  <li>
                    <strong>Teléfono:</strong> 112-456-789
                  </li>
                  <li>
                    <strong>Email:</strong> aperez@ejemplo.com
                  </li>
                  <li>
                    <strong>Ubicación:</strong> Calle Ramos y Cajal, 4, Madrid
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card-servicio shadow">
              <div className="card-servicio-header">Civil</div>
              <div className="card-servicio-body">
                <ul>
                  <li>
                    <strong>Nombre:</strong> Luisa Gómez
                  </li>
                  <li>
                    <strong>Teléfono:</strong> 997-654-321
                  </li>
                  <li>
                    <strong>Email:</strong> lgomez@ejemplo.com
                  </li>
                  <li>
                    <strong>Ubicación:</strong> Calle Palomeras, 100, Madrid
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card-servicio shadow">
              <div className="card-servicio-header">Familiar</div>
              <div className="card-servicio-body">
                <ul>
                  <li>
                    <strong>Nombre:</strong> Carmen Ruiz
                  </li>
                  <li>
                    <strong>Teléfono:</strong> 983-113-666
                  </li>
                  <li>
                    <strong>Email:</strong> cruiz@ejemplo.com
                  </li>
                  <li>
                    <strong>Ubicación:</strong> Calle Palomeras, 23, Madrid
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT*/}
      <div
        className="chat-float"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/chat")}
      >
        <i className="bi bi-chat-dots-fill"></i>
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

export default AyudaLegal;
