import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const CerrarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    window.history.pushState(null, "", window.location.href);

    const bloquearRetroceso = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", bloquearRetroceso);

    return () => {
      window.removeEventListener("popstate", bloquearRetroceso);
    };
  }, []);

  // SALIDA RÁPIDA
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="cardCerrarSesion alert text-center shadow p-4"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
        <h4 className="fw-bold">Has cerrado la sesión correctamente</h4>
        <p className="text-muted small">
          Gracias por utilizar nuestra plataforma segura.
        </p>

        <div className="d-grid gap-2 mt-4">
          <button
            className="botonCerrarSesion btn text-white"
            style={{ backgroundColor: "#6f42c1" }}
            onClick={() => navigate("/", { replace: true })}
          >
            Volver al inicio
          </button>

          <button className="btn btn-outline-secondary" onClick={salidaRapida}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Salir de la página
          </button>
        </div>
      </div>
    </div>
  );
};

export default CerrarSesion;
