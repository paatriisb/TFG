import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const ChatSeguro = () => {
  const navigate = useNavigate();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  type Especialidad = "psicologa" | "abogada";
  type Message = {
    id: number;
    text: string;
    type: "sent" | "received";
  };

  // --- ESTADOS ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [especialidadActual, setEspecialidadActual] = useState<
    Especialidad | ""
  >("");
  const [esperandoDecision, setEsperandoDecision] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  // --- CONFIGURACIÓN ---
  const menus: Record<Especialidad, string> = {
    psicologa:
      "Elige una opción escribiendo el número:\n1. Técnicas de calma\n2. ¿Cómo gestionar el miedo?\n3. Redes de apoyo",
    abogada:
      "Elige una opción escribiendo el número:\n1. Tipos de trámites\n2. Sobre mis derechos\n3. Orden de protección",
  };

  const respuestasDetalladas = {
    psicologa: {
      1: `Técnicas de calma: Para reducir la ansiedad y el estrés, puedes probar la respiración 4-7-8: inhala contando hasta 4, mantén la respiración 7 segundos, exhala lentamente 8 segundos. Combina esto con relajación muscular progresiva y meditación guiada. Practicar estas técnicas 10-15 minutos al día mejora tu bienestar emocional.`,
      2: `Gestión del miedo: Sentir miedo es natural ante situaciones inciertas. Identifica lo que realmente te preocupa y cuestiona pensamientos irracionales. Combina con respiración y relajación, habla con alguien de confianza y mantén rutinas de autocuidado.<br><br><button class="btn btn-sm btn-light border" onclick="window.open('guiasYrecursosdeapoyo.html', '_blank')">Ver guías y recursos de apoyo</button>`,
      3: `Redes de apoyo: No estás sola. Busca grupos de apoyo locales, asociaciones o comunidades en línea. Participar en actividades sociales y voluntariado ayuda a crear conexiones. También puedes acudir a psicólogos especializados.<br><br><button class="btn btn-sm btn-light border" onclick="window.open('testimonios.html', '_blank')">Ver testimonios</button>`,
    },
    abogada: {
      1: `Tipos de trámites legales: Divorcio, custodia, pensiones alimenticias, adopciones, herencias, denuncias o ayudas sociales. Infórmate siempre en comisarías, juzgados o servicios legales gratuitos.`,
      2: `Tus derechos: Derecho a asistencia jurídica gratuita, información, representación legal y protección en situaciones de vulnerabilidad. Conoce tus derechos laborales y familiares.`,
      3: `Orden de protección: Recurso legal para protegerte de violencia o acoso. Incluye medidas como prohibición de acercamiento, alejamiento del hogar y asistencia social.<br><br><button class="btn btn-sm btn-light border" onclick="window.open('ayudaLegal.html', '_blank')">Acceder a ayuda legal</button>`,
    },
  };

  const perfiles = {
    psicologa: [
      {
        nombre: "Ana Martínez",
        especialidad: "ansiedad y estrés",
        lugar: "Madrid",
      },
      {
        nombre: "Lucía Gómez",
        especialidad: "terapia familiar",
        lugar: "Barcelona",
      },
      { nombre: "María López", especialidad: "depresión", lugar: "Valencia" },
      { nombre: "Sara Torres", especialidad: "autoestima", lugar: "Sevilla" },
      {
        nombre: "Elena Ruiz",
        especialidad: "trauma infantil",
        lugar: "Bilbao",
      },
    ],
    abogada: [
      {
        nombre: "Laura Sánchez",
        especialidad: "derecho familiar",
        lugar: "Madrid",
      },
      {
        nombre: "Carmen Díaz",
        especialidad: "violencia de género",
        lugar: "Barcelona",
      },
      {
        nombre: "Isabel Fernández",
        especialidad: "divorcios y custodia",
        lugar: "Valencia",
      },
      {
        nombre: "Patricia Morales",
        especialidad: "herencias y testamentos",
        lugar: "Sevilla",
      },
      {
        nombre: "Marta González",
        especialidad: "asistencia legal gratuita",
        lugar: "Bilbao",
      },
    ],
  };

  // --- EFECTOS ---
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

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // --- FUNCIONES ---
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
  };

  const addMessage = (text: string, type: "sent" | "received") => {
    setMessages((prev) => [
      ...prev,
      { text, type, id: Date.now() + Math.random() },
    ]);
  };

  const iniciarChat = (opcion: Especialidad) => {
    setEspecialidadActual(opcion);
    const lista = perfiles[opcion];
    const perfil = lista[Math.floor(Math.random() * lista.length)];

    addMessage(
      `Has elegido ${opcion === "psicologa" ? "Psicóloga" : "Abogada"}. Ahora estás hablando con ${perfil.nombre}, especializada en ${perfil.especialidad} en ${perfil.lugar}.`,
      "received",
    );
    setInputDisabled(false);
    setTimeout(() => addMessage(menus[opcion], "received"), 600);
  };

  const reiniciarChat = () => {
    setMessages([]);
    setEspecialidadActual("");
    setEsperandoDecision(false);
    setInputDisabled(true);
    addMessage(
      "¡Hola de nuevo! ¿Con quién quieres hablar ahora? Psicóloga o Abogada.",
      "received",
    );
  };

  const procesarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const mensaje = inputValue.trim().toLowerCase();
    if (!mensaje) return;

    addMessage(mensaje, "sent");
    setInputValue("");

    setTimeout(() => {
      if (esperandoDecision) {
        // 👇 AQUÍ VA LA GUARD CLAUSE
        if (!especialidadActual) return;

        if (mensaje === "sí" || mensaje === "si") {
          addMessage("Perfecto, aquí tienes más opciones:", "received");

          setTimeout(
            () => addMessage(menus[especialidadActual], "received"),
            600,
          );

          setEsperandoDecision(false);
        } else if (mensaje === "hablar") {
          const nueva =
            especialidadActual === "psicologa" ? "abogada" : "psicologa";

          iniciarChat(nueva);
          setEsperandoDecision(false);
        } else if (mensaje === "no") {
          addMessage("De acuerdo. Ha sido un placer ayudarte. 💜", "received");
          setInputDisabled(true);
          setEsperandoDecision(false);
        } else {
          addMessage("Responde con: sí / hablar / no", "received");
        }

        return;
      }

      if (!especialidadActual) {
        if (mensaje === "psicologa" || mensaje === "psicóloga") {
          iniciarChat("psicologa");
        } else if (mensaje === "abogada") {
          iniciarChat("abogada");
        } else {
          addMessage("Selecciona primero Psicóloga o Abogada.", "received");
        }
        return;
      }

      if (["1", "2", "3"].includes(mensaje)) {
        addMessage(
          (respuestasDetalladas as any)[especialidadActual][mensaje],
          "received",
        );
        setTimeout(() => {
          const otra =
            especialidadActual === "psicologa" ? "abogada" : "psicologa";
          addMessage(
            `¿Necesitas algo más o prefieres hablar con una ${otra}? (sí / hablar / no)`,
            "received",
          );
          setEsperandoDecision(true);
        }, 800);
      } else {
        addMessage("Escribe solo 1, 2 o 3.", "received");
      }
    }, 600);
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

      {/* CONTROLES RÁPIDOS */}
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

      {/* CHAT CENTRAL */}
      <div className="container mt-4 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                  <strong className="texto-morado">
                    Atención Especializada
                  </strong>
                  <div className="status-online">
                    <i className="bi bi-circle-fill"></i> Conectada ahora
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => navigate("/introduccion")}
                >
                  Finalizar Chat
                </button>
              </div>

              <div
                className="card-body chat-window d-flex flex-column"
                id="chatBox"
                ref={chatBoxRef}
                style={{ height: "400px", overflowY: "auto" }}
              >
                <div className="message received">
                  ¡Hola! Soy tu asistente de confianza. Selecciona una opción
                  para comenzar:
                </div>

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`message ${m.type}`}
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  ></div>
                ))}

                {!especialidadActual && (
                  <div
                    id="opciones-inicio"
                    className="d-flex gap-2 mt-2 justify-content-center"
                  >
                    <button
                      className="btn btn-morado-personalizado btn-sm"
                      onClick={() => iniciarChat("psicologa")}
                    >
                      Psicóloga
                    </button>
                    <button
                      className="btn btn-morado-personalizado btn-sm"
                      onClick={() => iniciarChat("abogada")}
                    >
                      Abogada
                    </button>
                  </div>
                )}

                {inputDisabled && messages.length > 5 && (
                  <button
                    className="btn btn-morado-personalizado mt-2 align-self-center"
                    onClick={reiniciarChat}
                  >
                    Volver a hablar
                  </button>
                )}
              </div>

              <div className="card-footer bg-white">
                <form onSubmit={procesarEnvio} className="input-group">
                  <input
                    type="text"
                    className="form-control border-morado"
                    placeholder={
                      inputDisabled
                        ? "Selecciona una opción arriba..."
                        : "Escribe aquí..."
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={inputDisabled}
                  />
                  <button
                    className="btn btn-morado-personalizado"
                    type="submit"
                    disabled={inputDisabled}
                  >
                    <i className="bi bi-send"></i>
                  </button>
                </form>
              </div>
            </div>
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

export default ChatSeguro;
