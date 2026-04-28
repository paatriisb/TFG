import "../assets/css/loginRegistro.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Registro() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  // 🚪 salida rápida
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // 👁 mostrar/ocultar password
  useEffect(() => {
    // no hace falta DOM, lo controlamos con state
  }, [mostrar]);

  // 🌙 modo discreto
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

  // 🧠 VALIDACIÓN + REGISTRO
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ya existe
    if (localStorage.getItem("emailRegistrado") === email && email !== "") {
      Swal.fire("Error", "Este correo ya existe", "error");
      return;
    }

    if (!password || !password2) {
      Swal.fire("Atención", "Completa todos los campos", "warning");
      return;
    }

    // seguridad contraseña
    let error = "";

    if (password.length < 8) {
      error = "Mínimo 8 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      error = "Debe tener una mayúscula";
    } else if (!/[a-z]/.test(password)) {
      error = "Debe tener una minúscula";
    } else if (!/[0-9]/.test(password)) {
      error = "Debe tener un número";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?·]/.test(password)) {
      error = "Debe tener un símbolo";
    }

    if (error) {
      Swal.fire("Seguridad insuficiente", error, "warning");
      return;
    }

    if (password !== password2) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    // guardar
    localStorage.setItem("emailRegistrado", email);
    localStorage.setItem("passRegistrada", password);
    localStorage.setItem("usuario", "Patrii");

    Swal.fire("¡Éxito!", "Cuenta creada correctamente", "success").then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      {/* HEADER */}
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
            style={{
              background: "linear-gradient(90deg, #ff4c4c, #ff0000)",
            }}
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="container px-3 mt-5">
        <div className="card card-login shadow">
          <div className="card-header-custom d-flex justify-content-between align-items-center shadow-sm">
            <div>
              <h2 className="fw-bold mb-0">NUEVA CUENTA</h2>
              <p className="mb-0 opacity-75" style={{ fontSize: "0.85rem" }}>
                REGISTRO DE USUARIO SEGURO
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
                  type={mostrar ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* REPETIR PASSWORD */}
              <div className="mb-3">
                <label className="form-label fw-semibold label-purple">
                  REPETIR CONTRASEÑA
                </label>

                <input
                  type={mostrar ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>

              {/* CHECKBOX */}
              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={mostrar}
                  onChange={() => setMostrar(!mostrar)}
                />
                <label className="form-check-label label-purple fw-bold">
                  Mostrar contraseñas
                </label>
              </div>

              {/* BOTONES */}
              <div className="d-grid gap-3">
                <button
                  type="submit"
                  className="btn btn-login-submit py-2 shadow-sm text-white"
                >
                  CREAR CUENTA
                </button>

                <button
                  type="button"
                  className="btn btn-outline-purple py-2"
                  onClick={() => navigate("/login")}
                >
                  VOLVER AL LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;
