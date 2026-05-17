import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/loginRegistro.css";

function Login() {
  const navigate = useNavigate();

  // ESTADOS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(false);

  // MODO DISCRETO
  useEffect(() => {
    const modoGuardar = localStorage.getItem("modoDiscreto");
    if (modoGuardar === "true") {
      setModoDiscreto(true);
    }
  }, []);

  // MODO DISCRETO
  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  // MODO DISCRETO: ATAJO DE TECLADO (CTRL + D)
  useEffect(() => {
    const atajoTeclado = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setModoDiscreto((prev) => !prev);
      }
    };

    window.addEventListener("keydown", atajoTeclado);
    return () => window.removeEventListener("keydown", atajoTeclado);
  }, []);

  // SALIDA RÁPIDA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // CERRAR SESIÓN POR INACTIVIDAD (1 MINUTO)
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
      }, 60000);
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

  // VALIDACIÓN Y ENVÍO DEL FORMULARIO
  const validarFormulario = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Rellena todos los campos");
      return;
    }

    const usuario = {
      nombre: email.split("@")[0],
      email: email,
      password: password,
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    console.log("Usuario guardado:", usuario);
    navigate("/emergencia");
  };

  return (
    <>
      {/* BOTONES */}
      <div className="container-fluid mt-2">
        <div className="d-flex justify-content-end pe-4">
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

      {/* CARD DEL LOGIN */}
      <div className="container px-3 mt-4">
        <div className="card card-login shadow">
          <div className="card-encabezado d-flex justify-content-between align-items-center shadow-sm">
            <div>
              <h2 className="fw-bold mb-0">016 SEGURO</h2>
              <p className="mb-0 opacity-75" style={{ fontSize: "0.85rem" }}>
                ACCESO SEGURO CON VERIFICACIÓN
              </p>
            </div>

            <img
              src="/logo.png"
              alt="Logo"
              width="70"
              height="70"
              className="rounded-circle border border-white border-2"
            />
          </div>

          {/* FORMULARIO */}
          <div className="card-body p-4">
            <form onSubmit={validarFormulario}>
              <div className="mb-3">
                <label className="form-label fw-semibold texto-destacado">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold texto-destacado">
                  CONTRASEÑA
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* BOTONES CARD LOGIN */}
              <div className="d-grid gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-acceso-login py-2 shadow-sm text-white"
                >
                  INICIAR SESIÓN
                </button>

                <button
                  type="button"
                  className="btn btn-crear-cuenta py-2"
                  onClick={() => navigate("/registro")}
                >
                  CREAR CUENTA
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/recuperacion");
                    }}
                    className="enlace-recuperar-contraseña fw-bold"
                    style={{ color: "#6f42c1", textDecoration: "none" }}
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;