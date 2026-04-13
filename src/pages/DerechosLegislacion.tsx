import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css"; // Asegúrate de que la ruta sea correcta

const DerechosLegislacion = () => {
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // --- LOGICA MODO DISCRETO ---
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

  // --- DATOS DE LAS TARJETAS (Para facilitar el filtrado) ---
  const tarjetasDerechos = [
    {
      titulo: "Derechos Fundamentales de la Víctima",
      puntos: [
        {
          negrita: "Derecho a la información:",
          texto:
            "Recibir asesoramiento pleno sobre tu situación jurídica y los recursos sociales disponibles.",
        },
        {
          negrita: "Asistencia jurídica:",
          texto:
            "Acceso a defensa legal gratuita y especializada de forma inmediata.",
        },
        {
          negrita: "Atención integral:",
          texto:
            "Derecho a servicios sociales, sanitarios y de emergencia para la recuperación física y psicológica.",
        },
        {
          negrita: "Protección de datos:",
          texto:
            "Salvaguarda de tu identidad y domicilio durante todo el proceso judicial.",
        },
      ],
    },
    {
      titulo: "Marco Legal: Ley Integral (Orgánica 1/2004)",
      puntos: [
        {
          negrita: "Objeto de la ley:",
          texto:
            "Medidas de protección integral contra la violencia ejercida por parejas o ex-parejas.",
        },
        {
          negrita: "Unidades Especializadas:",
          texto:
            "Creación de Juzgados de Violencia sobre la Mujer para una atención focalizada.",
        },
        {
          negrita: "Derechos Laborales:",
          texto:
            "Posibilidad de reducción de jornada, movilidad geográfica o suspensión de la relación laboral.",
        },
        {
          negrita: "Derecho a la vivienda:",
          texto:
            "Prioridad en el acceso a viviendas protegidas y residencias públicas.",
        },
      ],
    },
    {
      titulo: "Órdenes de Protección y Medidas Cautelares",
      puntos: [
        {
          negrita: "Orden de alejamiento:",
          texto:
            "Prohibición de aproximación y comunicación del agresor con la víctima.",
        },
        {
          negrita: "Medidas penales:",
          texto:
            "Atribución del uso de la vivienda familiar y custodia de menores a la víctima.",
        },
        {
          negrita: "Protección policial:",
          texto:
            "Seguimiento y vigilancia por parte de unidades policiales especializadas (UFAM/EMUME.",
        },
        {
          negrita: "Dispositivos telemáticos:",
          texto:
            "Instalación de sistemas de control (pulseras) para verificar el cumplimiento del alejamiento.",
        },
      ],
    },
    {
      titulo: "Derechos en Situación de Extranjería",
      puntos: [
        {
          negrita: "Autorización de residencia:",
          texto:
            "Posibilidad de solicitar residencia y trabajo por circunstancias excepcionales tras una denuncia.",
        },
        {
          negrita: "No expulsión:",
          texto:
            "Suspensión de expedientes administrativos sancionadores por estancia irregular durante el proceso.",
        },
        {
          negrita: "Intérprete gratuito:",
          texto:
            "Derecho a traducción y asistencia lingüística en todos los trámites judiciales.",
        },
        {
          negrita: "Acceso a ayudas:",
          texto:
            "Derecho a las mismas prestaciones de emergencia que el resto de las víctimas residentes.",
        },
      ],
    },
    {
      titulo: "Procedimiento Legal y Denuncia",
      puntos: [
        {
          negrita: "Lugar de presentación:",
          texto:
            "Comisaría de Policía, Cuartel de la Guardia Civil o Juzgado de Guardia.",
        },
        {
          negrita: "Derecho a no declarar:",
          texto:
            "Exención del deber de declarar contra el cónyuge o pariente (Art. 416 LECrim).",
        },
        {
          negrita: "Parte de lesiones:",
          texto:
            "Obligatoriedad de los centros médicos de remitir al juzgado cualquier sospecha de agresión.",
        },
        {
          negrita: "Acompañamiento:",
          texto:
            "Derecho a estar acompañada por una persona de confianza durante la toma de declaración.",
        },
      ],
    },
    {
      titulo: "Ayudas Económicas y Subvenciones",
      puntos: [
        {
          negrita: "RAI (Renta Activa de Inserción):",
          texto:
            "Ayuda mensual específica para víctimas de violencia con dificultades económicas.",
        },
        {
          negrita: "Artículo 27:",
          texto:
            "Ayuda de pago único para víctimas con especiales dificultades de empleabilidad por edad o discapacidad.",
        },
        {
          negrita: "Bonificaciones fiscales:",
          texto:
            "Desgravaciones y beneficios en el IRPF por situaciones derivadas de la violencia.",
        },
        {
          negrita: "Fondo de Garantía:",
          texto:
            "Pago de alimentos y pensiones impagadas por parte del agresor bajo ciertas condiciones.",
        },
      ],
    },
  ];

  // Filtrado reactivo para el buscador
  const tarjetasFiltradas = tarjetasDerechos.filter((tarjeta) =>
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

      {/* BARRA DE BUSQUEDA Y BOTONES DE CONTROL */}
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
                  placeholder="Buscar derechos o trámites..."
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
        <h1 className="titulo-seccion">INFORMACIÓN - DERECHOS Y LEGISLACIÓN</h1>
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

export default DerechosLegislacion;
