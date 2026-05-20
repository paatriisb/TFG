import { useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/loginRegistro.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ActualizarPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire({
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "error",
        confirmButtonColor: "#6f42c1",
      });
      return;
    }

    setCargando(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        Swal.fire({
          title: "Error",
          text: error.message || "No se pudo actualizar la contraseña.",
          icon: "error",
          confirmButtonColor: "#6f42c1",
        });
      } else {
        Swal.fire({
          title: "¡Contraseña actualizada!",
          text: "Tu contraseña ha sido cambiada con éxito. Ya puedes iniciar sesión.",
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
    <div className="container px-3 mt-5">
      <div className="card card-login shadow mx-auto">
        <div className="card-encabezado d-flex justify-content-between align-items-center shadow-sm">
          <div>
            <h2 className="fw-bold mb-0">NUEVA CONTRASEÑA</h2>
            <p className="mb-0 opacity-75" style={{ fontSize: "0.85rem" }}>
              ESTABLECE TU CLAVE DE ACCESO
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
            Escribe tu nueva contraseña a continuación para actualizarla en el sistema.
          </p>

          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4 text-start position-relative">
              <label className="form-label fw-semibold texto-destacado">
                NUEVA CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={cargando}
                required
              />
            </div>

            <div className="d-grid gap-3">
              <button
                type="submit"
                className="btn btn-acceso-login py-2 shadow-sm text-white w-100"
                disabled={cargando}
              >
                {cargando ? "GUARDANDO..." : "ACTUALIZAR CONTRASEÑA"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPassword;