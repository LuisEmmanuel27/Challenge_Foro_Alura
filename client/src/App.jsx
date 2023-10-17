import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Foro from "./pages/Foro";
import CrearTopic from "./pages/CrearTopic";
import VerTopico from "./pages/VerTopico";
import RutasPrivadas from "./components/RutasPrivadas";
import EditarTopico from "./pages/EditarTopico";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/foro" element={<RutasPrivadas><Foro /></RutasPrivadas>} />
        <Route path="/foro/crear" element={<RutasPrivadas><CrearTopic /></RutasPrivadas>} />
        <Route path="/foro/topico/:auth/:id" element={<RutasPrivadas><VerTopico /></RutasPrivadas>} />
        <Route path="/foro/editar/:id" element={<RutasPrivadas><EditarTopico /></RutasPrivadas>} />
      </Routes>
    </Router>
  )
}

export default App
