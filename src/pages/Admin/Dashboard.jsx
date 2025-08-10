import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Estadísticas simuladas
  const [stats, setStats] = useState({
    users: 20,
    admins: 5,
    uptime: 98,
  });

  // Actividad reciente simulada
  const recent = [
    { icon: "📝", text: "Nuevo usuario registrado: Juan Pérez" },
    { icon: "🔒", text: "Administrador cambió su contraseña" },
    { icon: "⚡", text: "Sistema actualizado a versión 2.1" },
    { icon: "👤", text: "Usuario eliminado: Maria Lopez" },
  ];

  // Animación y estilos
  const colors = {
    text: isDark ? "#f1f1f1" : "#222",
    cardBg: isDark ? "#2c2c2e" : "white",
    cardShadow: isDark ? "0 4px 18px rgba(0,0,0,0.4)" : "0 4px 18px rgba(0,0,0,0.12)",
    bg: isDark ? "#18191a" : "#fff",
    btnBg: isDark ? "#414345" : "#4facfe",
    btnColor: "#fff",
    accent: isDark ? "#e74c3c" : "#ff9800",
    border: isDark ? "#444" : "#eee",
  };

  const cardAnim = {
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    cursor: "pointer",
    border: `2px solid transparent`,
    position: "relative",
    overflow: "hidden",
  };

  const [hovered, setHovered] = useState(null);

  // Simula actualización de estadísticas
  const handleRefresh = () => {
    setStats({
      users: stats.users + Math.floor(Math.random() * 2),
      admins: stats.admins,
      uptime: Math.min(100, stats.uptime + Math.floor(Math.random() * 2)),
    });
  };

  return (
    <div className="page" style={{ background: colors.bg, color: colors.text, minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      <h1 style={{ marginTop: "2rem", textAlign: "center", fontWeight: "bold", letterSpacing: "1px" }}>Panel de Administración</h1>
      <p style={{ textAlign: "center", marginBottom: "2rem" }}>
        Bienvenido al panel de control de <strong>Reflexo Agency</strong>.<br />
        Desde aquí puedes gestionar usuarios, configurar la aplicación y ver estadísticas generales.
      </p>
      <div className="dashboard-cards" style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        margin: "2rem 0",
        flexWrap: "wrap"
      }}>
        <div
          style={{
            background: colors.cardBg,
            color: colors.text,
            boxShadow: colors.cardShadow,
            borderRadius: "14px",
            padding: "2.2rem 2rem",
            minWidth: "180px",
            textAlign: "center",
            ...cardAnim,
            ...(hovered === 0 ? {
              transform: "scale(1.07)",
              border: `2px solid ${colors.accent}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            } : {}),
            animation: "fadeIn 1s",
          }}
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: "2.2rem", marginBottom: "8px", display: "block" }}>👥</span>
          <h3 style={{ fontSize: "2rem", margin: "0" }}>{stats.users}</h3>
          <p>Usuarios registrados</p>
        </div>
        <div
          style={{
            background: colors.cardBg,
            color: colors.text,
            boxShadow: colors.cardShadow,
            borderRadius: "14px",
            padding: "2.2rem 2rem",
            minWidth: "180px",
            textAlign: "center",
            ...cardAnim,
            ...(hovered === 1 ? {
              transform: "scale(1.07)",
              border: `2px solid ${colors.accent}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            } : {}),
            animation: "fadeIn 1.2s",
          }}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: "2.2rem", marginBottom: "8px", display: "block" }}>🛡️</span>
          <h3 style={{ fontSize: "2rem", margin: "0" }}>{stats.admins}</h3>
          <p>Administradores activos</p>
        </div>
        <div
          style={{
            background: colors.cardBg,
            color: colors.text,
            boxShadow: colors.cardShadow,
            borderRadius: "14px",
            padding: "2.2rem 2rem",
            minWidth: "180px",
            textAlign: "center",
            ...cardAnim,
            ...(hovered === 2 ? {
              transform: "scale(1.07)",
              border: `2px solid ${colors.accent}`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            } : {}),
            animation: "fadeIn 1.4s",
          }}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: "2.2rem", marginBottom: "8px", display: "block" }}>⚡</span>
          <h3 style={{ fontSize: "2rem", margin: "0" }}>{stats.uptime}%</h3>
          <p>Uptime del sistema</p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={handleRefresh}
          style={{
            background: colors.accent,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            marginTop: "10px",
          }}
        >
          Actualizar estadísticas
        </button>
      </div>
      <div className="dashboard-links" style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/admin/users" style={{
          background: colors.btnBg,
          color: colors.btnColor,
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s, transform 0.2s",
        }}>Ver Usuarios</Link>
        <Link to="/admin/settings" style={{
          background: colors.btnBg,
          color: colors.btnColor,
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s, transform 0.2s",
        }}>Configuración</Link>
        <Link to="/admin/profile" style={{
          background: colors.btnBg,
          color: colors.btnColor,
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s, transform 0.2s",
        }}>Mi Perfil</Link>
      </div>
      <div style={{
        margin: "3rem auto 2rem auto",
        maxWidth: "500px",
        background: colors.cardBg,
        boxShadow: colors.cardShadow,
        borderRadius: "14px",
        padding: "2rem",
        border: `1.5px solid ${colors.border}`,
        animation: "fadeIn 1.6s"
      }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: colors.accent, fontWeight: "bold" }}>Actividad Reciente</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {recent.map((item, idx) => (
            <li key={idx} style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              opacity: 0.95,
              transition: "background 0.2s",
              padding: "6px 0",
            }}>
              <span style={{ fontSize: "1.4rem", marginRight: "12px" }}>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      {/* Animaciones CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .dashboard-cards > div:hover {
          transform: scale(1.07);
          border: 2px solid ${colors.accent};
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .dashboard-links a:hover {
          background: ${colors.accent};
          color: #fff;
          transform: scale(1.07);
        }
        button:hover {
          background: ${colors.btnBg};
          color: #fff;
          transform: scale(1.07);
        }
      `}</style>
    </div>
  );
}