import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/informacion.css";

const CerrarSesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Limpieza de datos (Lo que ya tenías)
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    // 2. Lógica para bloquear el botón "Atrás" del navegador
    // Insertamos un estado actual en el historial
    window.history.pushState(null, null, window.location.href);

    const bloquearRetroceso = () => {
      // Si intentan ir atrás, volvemos a empujar el estado para que se queden aquí
      window.history.pushState(null, null, window.location.href);
    };

    window.addEventListener("popstate", bloquearRetroceso);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("popstate", bloquearRetroceso);
    };
  }, []);

  // --- FUNCIÓN DE SALIDA RÁPIDA ---
  const salidaRapida = () => {
    window.location.replace("https://www.google.com");
    window.open("https://www.google.com", "_newtab");
  };

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
            // Usamos replace: true para que al ir al inicio, esta página se borre del historial
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
