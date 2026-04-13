import "../assets/css/loginRegistro.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(false);

  // salida rápida
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // submit login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Rellena todos los campos");
      return;
    }

    console.log("Login:", { email, password });

    // aquí luego puedes meter lógica real o validación
  };

  return (
    <>
      {/* HEADER */}
      <div className="container-fluid mt-2">
        <div className="d-flex justify-content-end pe-4">
          <button className="btn text-black me-2 btn-modo-discreto">
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

      {/* LOGIN CARD */}
      <div className="container px-3 mt-4">
        <div className="card card-login shadow">
          <div className="card-header-custom d-flex justify-content-between align-items-center shadow-sm">
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

          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label fw-semibold label-purple">
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

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold label-purple">
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

              {/* BOTONES */}
              <div className="d-grid gap-3 mt-4">
                <button
                  type="submit"
                  className="btn btn-login-submit py-2 shadow-sm text-white"
                >
                  INICIAR SESIÓN
                </button>

                <button
                  type="button"
                  className="btn btn-outline-purple py-2"
                  onClick={() => navigate("/registro")}
                >
                  CREAR CUENTA
                </button>

                <div className="text-center">
                  <a
                    href="#"
                    className="forgot-password fw-bold"
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
  useEffect(() => {
    const saved = localStorage.getItem("modoDiscreto");

    if (saved === "true") {
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

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("modoDiscreto");

    if (saved === "true") {
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

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}

export default Login;
