import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon, FiSettings, FiUser, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`header ${theme}`}
      style={{
        background: theme === "light" ? "#1976d2" : "#222",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px var(--form-shadow)",
        position: "sticky",
        top: 0,
        zIndex: 99
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <FiHome style={{ fontSize: 22 }} />
        <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "1.3rem" }}>Panel Admin</h2>
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Link to="/admin/profile" style={{ color: "white", textDecoration: "none", fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}>
          <FiUser /> Perfil
        </Link>
        <Link to="/admin/settings" style={{ color: "white", textDecoration: "none", fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}>
          <FiSettings /> Configuración
        </Link>
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            transition: "transform 0.2s"
          }}
          aria-label="Cambiar tema"
          title="Cambiar tema"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </nav>
    </header>
  );
}