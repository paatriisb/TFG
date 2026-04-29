import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Estado inicial con los campos vacíos
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // 1. CARGAR DATOS
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setUserData({
          nombre: parsed.nombre || "",
          email: parsed.email || "",
          password: parsed.password || "",
        });
      } catch (e) {
        setUserData((prev) => ({ ...prev, nombre: data }));
      }
    }

    // Aplicar clase de modo discreto al body
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // 2. ACTUALIZACIÓN DINÁMICA
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  // 3. GUARDADO
  const guardarCambios = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("usuario", JSON.stringify(userData));
    setIsEditing(false);
    alert("Cambios guardados. Se han actualizado los datos modificados.");
  };

  // 4. SALIDA RÁPIDA
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
              {/* Servicios */}
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

              {/* Información */}
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

              {/* Usuario */}
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

      {/* Botones Modo Discreto y Salida Rápida */}
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

      {/* Formulario de Perfil */}
      <div className="container mt-4">
        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "500px", borderRadius: "15px" }}
        >
          <div
            className="p-4 text-white d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "#6f42c1",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <div>
              <h2 className="mb-0 fw-bold">MI PERFIL</h2>
              <p className="mb-0 opacity-75">
                Gestiona tu información personal
              </p>
            </div>
            <img
              src="logo.png"
              alt="Logo"
              width="60"
              height="60"
              className="rounded-circle border border-white border-2"
            />
          </div>

          <div className="card-body p-4">
            <form onSubmit={guardarCambios}>
              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">
                  NOMBRE DE USUARIO
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombre"
                  value={userData.nombre}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-muted small">
                  CONTRASEÑA
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="••••••••"
                />
              </div>

              <div className="d-grid gap-2">
                {!isEditing ? (
                  <button
                    type="button"
                    className="btn btn-lg text-white"
                    style={{ backgroundColor: "#6f42c1" }}
                    onClick={() => setIsEditing(true)}
                  >
                    EDITAR DATOS
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-lg"
                      style={{ backgroundColor: "#6f42c1", color: "white" }}
                    >
                      CONFIRMAR CAMBIOS
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      DESCARTAR
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => navigate("/introduccion")}
                  className="btn btn-link text-decoration-none text-muted"
                >
                  Volver al menú
                </button>
              </div>
            </form>
          </div>
        </div>
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
                  className="footer-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/ayudaLegal")}
                >
                  Ayuda Legal
                </span>
              </p>
              <p>
                <span
                  className="footer-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/psicologia")}
                >
                  Psicología
                </span>
              </p>
              <p>
                <span
                  className="footer-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/centrosAcogida")}
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

export default Perfil;
