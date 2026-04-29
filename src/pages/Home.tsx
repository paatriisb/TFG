import "../assets/css/principal.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [modoDiscreto, setModoDiscreto] = useState(false);

  useEffect(() => {
    const guardarLocalStorage = localStorage.getItem("modoDiscreto");
    if (guardarLocalStorage === "true") {
      setModoDiscreto(true);
      document.body.classList.add("modo-discreto");
    }
  }, []);

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
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
    <div className="fondo">
      <div className="container mt-2">
        <div className="d-flex justify-content-end pe-2 pe-md-4 gap-2">
          <button
            className="btn text-white btn-modo-discreto"
            onClick={() => setModoDiscreto((prev) => !prev)}
          >
            Modo discreto
          </button>

          <button className="btn text-white btn-danger" onClick={salidaRapida}>
            X
          </button>
        </div>
      </div>

      {/* CARD */}
      <div className="container mt-4 px-2 px-md-3">
        <div className="card shadow border-0 card-principal mx-auto">
          {/* TÍTULO DE CARD */}
          <div className="card-header text-white text-center colorHeaderCard">
            <h4 className="card-title mb-0">Navegación segura</h4>
          </div>

          {/* CONTENIDO DE CARD */}
          <div className="card-body d-flex flex-column">
            {/* MINICARD 1 */}
            <div className="item-card row align-items-center mb-3 text-center">
              <div className="col-12 col-md-8">
                <p className="titulo-item mb-0">
                  · Borra tu historial de navegación
                </p>
              </div>
              <div className="col-12 col-md-4 text-center mt-3 mt-md-0">
                <span className="border rounded px-3 py-2 bg-light shadow-sm">
                  <i className="bi bi-trash"></i>
                </span>
              </div>
            </div>

            {/* MINICARD 2 */}
            <div className="item-card row align-items-center mb-3 text-center">
              <div className="col-12 col-md-8">
                <p className="titulo-item mb-1">· Opción de salir rápido</p>
                <p className="subtexto mb-2">
                  Usa <strong>ESC</strong> o el botón:
                </p>
                <button className="btn btn-danger btn-sm mt-2">X</button>
              </div>
              <div className="col-12 col-md-4 text-center mt-3 mt-md-0">
                <span className="border rounded px-3 py-2 bg-light shadow-sm">
                  {" "}
                  ESC
                </span>
              </div>
            </div>

            {/* MINICARD 3 */}
            <div className="item-card row align-items-center mb-3 text-center">
              <div className="col-12 col-md-8">
                <p className="titulo-item mb-1"> · Modo incógnito</p>
                <p className="subtexto mb-2">
                  Usa <strong>Ctrl + D</strong> o el botón:
                </p>
                <button className="btn btn-sm text-white btn-modo-discreto mt-2">
                  Modo discreto
                </button>
              </div>

              <div className="col-12 col-md-4 text-center mt-3 mt-md-0">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <span className="border rounded px-3 py-2 bg-light shadow-sm">
                    Ctrl
                  </span>
                  <span className="fw-bold">+</span>
                  <span className="border rounded px-3 py-2 bg-light shadow-sm">
                    D
                  </span>
                </div>
              </div>
            </div>

            {/* BOTON ENTRAR */}
            <div className="mt-auto text-center pt-3">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-entrar px-5 py-2 text-white"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
