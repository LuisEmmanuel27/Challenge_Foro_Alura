import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Foro from "./pages/Foro"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/foro" element={<Foro />} />
      </Routes>
    </Router>
  )
}

export default App
