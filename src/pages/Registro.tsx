import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "./supabaseClient";
import "../assets/css/loginRegistro.css";

function Registro() {
  const navigate = useNavigate();

  // ESTADOS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [modoDiscreto, setModoDiscreto] = useState(false);
  const [verContraseña, setVerContraseña] = useState(false);

  // MODO DISCRETO
  useEffect(() => {
    const modoGuardar = localStorage.getItem("modoDiscreto");

    if (modoGuardar === "true") {
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

  // CERRAR SESIÓN POR INACTIVIDAD DE 3 MINUTOS
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
      }, 180000);
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

  // SALIDA RÁPIDA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  // VALIDACIÓN Y ENVÍO DEL FORMULARIO DE REGISTRO
  const validarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmarContraseña) {
      Swal.fire("Atención", "Completa todos los campos", "warning");
      return;
    }

    if (password !== confirmarContraseña) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

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

    const { error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      Swal.fire("Error", supabaseError.message, "error");
      return;
    }

    Swal.fire("¡Éxito!", "Cuenta creada correctamente", "success").then(() => {
      navigate("/login");
    });
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
            style={{
              background: "linear-gradient(90deg, #ff4c4c, #ff0000)",
            }}
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      {/* CARD DEL REGISTRO */}
      <div className="container px-3 mt-5">
        <div className="card card-login shadow">
          <div className="card-encabezado d-flex justify-content-between align-items-center shadow-sm">
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

              {/* CONTRASEÑA */}
              <div className="mb-3">
                <label className="form-label fw-semibold texto-destacado">
                  CONTRASEÑA
                </label>
                <input
                  type={verContraseña ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* REPETIR CONTRASEÑA */}
              <div className="mb-3">
                <label className="form-label fw-semibold texto-destacado">
                  REPETIR CONTRASEÑA
                </label>
                <input
                  type={verContraseña ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="••••••••"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                />
              </div>

              {/* OPCIÓN MOSTRAR CONTRASEÑAS */}
              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={verContraseña}
                  onChange={() => setVerContraseña(!verContraseña)}
                />
                <label className="form-check-label texto-destacado fw-bold">
                  Mostrar contraseñas
                </label>
              </div>

              {/* BOTONES DEL REGISTRO */}
              <div className="d-grid gap-3">
                <button
                  type="submit"
                  className="btn btn-acceso-login py-2 shadow-sm text-white"
                >
                  CREAR CUENTA
                </button>

                <button
                  type="button"
                  className="btn btn-crear-cuenta py-2"
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
