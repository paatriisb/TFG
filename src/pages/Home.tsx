import "../assets/css/index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  // 1. estado del modo discreto
  const [modoDiscreto, setModoDiscreto] = useState(false);

  // 2. Cargar estado guardado en localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("modoDiscreto");
    if (saved === "true") {
      setModoDiscreto(true);
      document.body.classList.add("modo-discreto");
    }
  }, []);

  // 3. Aplicar cambios cuando cambia el estado
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }

    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // 4. Atajo teclado Ctrl + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setModoDiscreto((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 5. botón salida rápida
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="d-flex justify-content-end pe-4">
          <button
            className="btn text-white me-2 btn-modo-discreto"
            onClick={() => setModoDiscreto((prev) => !prev)}
          >
            Modo discreto
          </button>

          <button
            className="btn text-white btn-danger"
            style={{ background: "linear-gradient(90deg, #ff4c4c, #ff0000)" }}
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>
      <>
        {/* Card */}
        <div className="container-fluid mt-4 px-2">
          <div className="card shadow border-0 card-principal">
            {/* título */}
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#6f42c1", padding: "1rem" }}
            >
              <h4 className="card-title mb-0">Navegación segura</h4>
            </div>

            {/* Contenido */}
            <div className="card-body">
              <div className="mb-3">
                <span className="fw-semibold">
                  • Borra tu historial de navegación
                </span>
              </div>

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <span className="fw-semibold">
                  • Opción de salir rápido.
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mediante: botón escape
                  (esc)
                  <img
                    src="https://us.123rf.com/450wm/nemalo/nemalo1602/nemalo160200083/54251697-colecci%C3%B3n-electr%C3%B3nica-detalle-del-teclado-de-ordenador-negro-con-esc-clave.jpg?ver=6"
                    alt="esc"
                    style={{ width: "100px", height: "50px" }}
                  />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o el siguiente botón:
                  <button className="btn btn-danger btn-sm text-white">
                    X
                  </button>
                </span>
              </div>

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <span className="fw-semibold">
                  • Modo incógnito
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mediante: los botones
                  (control + D)
                  <img
                    src="https://img.freepik.com/vector-premium/combinacion-teclas-ctrl-d-icono-linea-eficiencia-automatizacion-ahorro-tiempo-tareas-repetitivas-experiencia-usuario-software-computadora-icono-lineal-vectorial-negocios-publicidad_727385-7761.jpg"
                    alt="controlD"
                    style={{ width: "100px", height: "50px" }}
                  />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o el siguiente botón:
                  <button className="btn btn-sm text-white btn-modo-discreto">
                    Modo discreto
                  </button>
                </span>
              </div>

              {/* Botón Entrar */}
              <div className="d-flex justify-content-center mt-4 mb-4 w-100">
                <button
                  onClick={() => navigate("/login")}
                  className="btn px-5 py-2 text-white"
                  style={{
                    background: "linear-gradient(90deg, #6f42c1, #9b59b6)",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
