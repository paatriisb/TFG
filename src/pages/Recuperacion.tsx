import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import "../assets/css/loginRegistro.css";
import { useNavigate } from "react-router-dom";

const Recuperar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

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

    try {
      await emailjs.send(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        {
          user_email: email,
        },
        "TU_PUBLIC_KEY",
      );

      Swal.fire({
        title: "¡Correo enviado!",
        text: "Revisa tu bandeja de entrada.",
        icon: "success",
        confirmButtonColor: "#6f42c1",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el correo.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="d-flex justify-content-end pe-4">
          <button
            className="btn text-black me-2 btn-modo-discreto"
            onClick={() => setModoDiscreto(!modoDiscreto)}
          >
            Modo discreto
          </button>

          <button
            className="btn text-white btn-danger btn-x-salir"
            onClick={salidaRapida}
          >
            X
          </button>
        </div>
      </div>

      <div className="container px-3 mt-5">
        <div className="card card-login shadow mx-auto">
          <div className="card-header-custom d-flex justify-content-between align-items-center shadow-sm">
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
                <label className="form-label fw-semibold label-purple">
                  CORREO ELECTRÓNICO
                </label>

                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid gap-3">
                <button
                  type="submit"
                  className="btn btn-login-submit py-2 shadow-sm text-white"
                >
                  ENVIAR INSTRUCCIONES
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary py-2"
                  onClick={() => navigate("/login")}
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

export default Recuperar;