import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/loginRegistro.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Recuperacion = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false); 

  const [modoDiscreto, setModoDiscreto] = useState(
    localStorage.getItem("modoDiscreto") === "true",
  );

  useEffect(() => {
    if (modoDiscreto) {
      document.body.classList.add("modo-discreto");
    } else {
      document.body.classList.remove("modo-discreto");
    }
    localStorage.setItem("modoDiscreto", String(modoDiscreto));
  }, [modoDiscreto]);

  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_blank");
  };

  const enviarCorreo = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      Swal.fire({
        title: "Correo no válido",
        text: "Introduce un correo válido.",
        icon: "error",
        confirmButtonColor: "#6f42c1",
      });
      return;
    }

    setCargando(true); 

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/actualizar-password`, 
      });

      if (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo enviar el correo de recuperación.",
          icon: "error",
          confirmButtonColor: "#6f42c1",
        });
      } else {
        Swal.fire({
          title: "¡Correo enviado!",
          text: "Se ha enviado un enlace de recuperación a tu correo electrónico.",
          icon: "success",
          confirmButtonColor: "#6f42c1",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error inesperado",
        text: "Ocurrió un problema de conexión. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonColor: "#6f42c1",
      });
    } finally {
      setCargando(false); 
    }
  };

  return (
    <>
      {/* BOTONES SUPERIORES */}
      <div className="container-fluid mt-2">
        <div className="d-flex justify-content-end pe-4">
          <button
            className="btn text-black me-2 btn-modo-discreto"
            onClick={() => setModoDiscreto(!modoDiscreto)}
          >
            Modo discreto
          </button>

          <button
            className="btn text-white btn-danger"
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      {/* CARD CON LAS CLASES CORRECTAS DE VUESTRO CSS */}
      <div className="container px-3 mt-5">
        <div className="card card-login shadow mx-auto">
          {/* ENCABEZADO CON LA CLASE: card-encabezado */}
          <div className="card-encabezado d-flex justify-content-between align-items-center shadow-sm">
            <div>
              <h2 className="fw-bold mb-0">RECUPERAR</h2>
              <p
                className="mb-0 opacity-75"
                style={{ fontSize: "0.85rem" }}
              >
                ENVÍO DE CÓDIGO SEGURO
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

          <div className="card-body p-4 text-center">
            <p className="text-muted mb-4">
              Introduce tu correo y te enviaremos las instrucciones.
            </p>

            <form onSubmit={enviarCorreo}>
              <div className="mb-4 text-start position-relative">
                {/* TEXTO DESTACADO CON LA CLASE: texto-destacado */}
                <label className="form-label fw-semibold texto-destacado">
                  CORREO ELECTRÓNICO
                </label>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={cargando}
                  required
                />
              </div>

              <div className="d-grid gap-3">
                {/* BOTÓN CON LA CLASE: btn-acceso-login (MORADO SEgÚN VUESTRO CSS) */}
                <button
                  type="submit"
                  className="btn btn-acceso-login py-2 shadow-sm text-white w-100"
                  disabled={cargando} 
                >
                  {cargando ? "ENVIANDO..." : "ENVIAR INSTRUCCIONES"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary py-2 w-100"
                  onClick={() => navigate("/login")}
                  disabled={cargando}
                >
                  VOLVER ATRÁS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recuperacion;