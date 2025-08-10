import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Profile() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const colors = {
    accent: theme === "dark" ? "#e74c3c" : "#4facfe",
    card: theme === "dark" ? "#232526" : "#fff",
    text: theme === "dark" ? "#f1f1f1" : "#222",
    btnBg: theme === "dark" ? "#e74c3c" : "#4facfe",
    btnColor: "#fff",
  };

  const btnStyle = {
    background: colors.btnBg,
    color: colors.btnColor,
    padding: "10px 28px",
    borderRadius: 8,
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    marginRight: 12,
    marginTop: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "background 0.2s, box-shadow 0.2s",
  };

  return (
    <div className="page" style={{ background: colors.card, color: colors.text, minHeight: "100vh" }}>
      <h1 className="page-title">Mi Perfil</h1>
      <div className="profile-container">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Avatar"
          className="profile-img"
        />
        <div className="profile-details">
          <h2 className="profile-name">Diego Espinoza</h2>
          <p><strong>Rol:</strong> Administrador del sistema</p>
          <p><strong>Email:</strong> diego@example.com</p>
          <p><strong>Miembro desde:</strong> Enero 2024</p>
          <p><strong>Ubicación:</strong> Lima, Perú</p>
          <p><strong>Estado:</strong> Activo</p>
          <p><strong>Último acceso:</strong> 07 de agosto de 2025 - 1:45 a.m.</p>
        </div>
      </div>

      <div className="profile-section">
        <h3>Actividad reciente</h3>
        <ul>
          <li> Editó un usuario - hace 2 horas</li>
          <li> Inició sesión - hoy a las 1:00 a.m.</li>
          <li> Cambió la configuración del sistema - ayer</li>
        </ul>
      </div>

      <div className="profile-section">
        <h3>Opciones rápidas</h3>
        <button className="profile-btn" style={btnStyle}>Editar perfil</button>
        <button className="profile-btn" style={btnStyle}>Cambiar contraseña</button>
        <button
          className="profile-btn"
          style={{ ...btnStyle, background: colors.accent }}
          onClick={handleThemeToggle}
        >
          Cambiar a tema {theme === "dark" ? "claro" : "oscuro"}
        </button>
      </div>
    </div>
  );
}