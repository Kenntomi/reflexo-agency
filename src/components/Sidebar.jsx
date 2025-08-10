import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun,
  FiPlus
} from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${theme}`} aria-label="Panel lateral de administración">
      <div>
        <h2 className="sidebar-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FiHome style={{ fontSize: 22 }} />
          Admin Panel
        </h2>
        <nav className="sidebar-nav" aria-label="Navegación de panel">
          <Link to="/admin">
            <FiHome className="icon" />
            <span>Inicio</span>
          </Link>
          <Link to="/admin/profile">
            <FiUser className="icon" />
            <span>Perfil</span>
          </Link>
          <Link to="/admin/register">
            <FiPlus className="icon" />
            <span>Registrar</span>
          </Link>
          <Link to="/admin/users">
            <FiUsers className="icon" />
            <span>Usuarios</span>
          </Link>
          <Link to="/admin/settings">
            <FiSettings className="icon" />
            <span>Configuración</span>
          </Link>
        </nav>
      </div>
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
        <button className="logout-button" onClick={handleLogout} aria-label="Cerrar sesión" title="Cerrar sesión">
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}