import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Chat from "./pages/Chat";
import Introduccion from "./pages/Introduccion";
import DerechosLegislacion from "./pages/DerechosLegislacion";
import Prevencion from "./pages/Prevencion";
import GuiasYrecursosdeapoyo from "./pages/GuiasYrecursosdeapoyo";
import Testimonios from "./pages/Testimonios";
import CerrarSesion from "./pages/CerrarSesion";
import Perfil from "./pages/Perfil";
import CentrosAcogida from "./pages/CentrosAcogida";
import Psicologia from "./pages/Psicologia";
import AyudaLegal from "./pages/AyudaLegal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/introduccion" element={<Introduccion />} />
        <Route path="/derechosLegislacion" element={<DerechosLegislacion />} />
        <Route path="/prevencion" element={<Prevencion />} />
        <Route
          path="/GuiasYrecursosdeapoyo"
          element={<GuiasYrecursosdeapoyo />}
        />
        <Route path="/testimonios" element={<Testimonios />} />
        <Route path="/cerrarSesion" element={<CerrarSesion />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/centrosAcogida" element={<CentrosAcogida />} />{" "}
        <Route path="/psicologia" element={<Psicologia />} />
        <Route path="/ayudaLegal" element={<AyudaLegal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
