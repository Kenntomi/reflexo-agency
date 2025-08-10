import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { theme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");
  const [integration, setIntegration] = useState("");

  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("settings") || "{}");
    if (prefs.notifications !== undefined) setNotifications(prefs.notifications);
    if (prefs.privacy) setPrivacy(prefs.privacy);
    if (prefs.integration) setIntegration(prefs.integration);
  }, []);

  const saveSection = (section, value) => {
    const prefs = JSON.parse(localStorage.getItem("settings") || "{}");
    prefs[section] = value;
    localStorage.setItem("settings", JSON.stringify(prefs));
    toast.success("¡Preferencia guardada!");
  };

  const colors = {
    bg: theme === "dark" ? "#18191a" : "#f7f7fa",
    card: theme === "dark" ? "#232526" : "#fff",
    text: theme === "dark" ? "#f1f1f1" : "#222",
    border: theme === "dark" ? "#414345" : "#e0e0e0",
    accent: "#e74c3c", // SIEMPRE rojo
  };

  const styles = {
    page: {
      background: colors.bg,
      color: colors.text,
      minHeight: "100vh",
      paddingBottom: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: 24,
      textAlign: "center",
    },
    card: {
      background: colors.card,
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      padding: 24,
      marginBottom: 24,
      border: `1px solid ${colors.border}`,
      maxWidth: 500,
      width: "100%",
      transition: "box-shadow 0.2s",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    h3: {
      color: colors.accent,
      marginBottom: 8,
      fontSize: "1.15rem",
    },
    label: {
      display: "block",
      marginTop: 12,
      fontSize: "1rem",
    },
    select: {
      fontSize: "1rem",
      padding: "6px 10px",
      borderRadius: 6,
      border: `1px solid ${colors.border}`,
      marginLeft: 10,
      marginTop: 6,
      background: colors.card,
      color: colors.text,
    },
    checkbox: {
      marginRight: 8,
      accentColor: colors.accent,
    },
    btn: {
      background: colors.accent,
      color: "#fff",
      padding: "10px 28px",
      borderRadius: 8,
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      marginTop: 18,
      transition: "background 0.2s, box-shadow 0.2s",
    },
  };

  return (
    <div className="page" style={styles.page}>
      <h1 style={styles.title}>⚙️ Configuración</h1>

      {/* Apariencia */}
      <div style={styles.card}>
        <h3 style={styles.h3}>Apariencia</h3>
        <div style={styles.label}>
          Tema actual: <b>{theme === "dark" ? "Oscuro" : "Claro"}</b>
          <div style={{ fontSize: "0.95rem", marginTop: 8, color: colors.text }}>
            Cambia el tema desde el botón de la barra superior.
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div style={styles.card}>
        <h3 style={styles.h3}>Notificaciones</h3>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            style={styles.checkbox}
          />
          Recibir notificaciones por correo
        </label>
        <button
          type="button"
          style={styles.btn}
          onClick={() => saveSection("notifications", notifications)}
        >
          Guardar Notificaciones
        </button>
      </div>

      {/* Privacidad */}
      <div style={styles.card}>
        <h3 style={styles.h3}>Privacidad</h3>
        <label style={styles.label}>
          Perfil visible para:
          <select
            value={privacy}
            onChange={e => setPrivacy(e.target.value)}
            style={styles.select}
          >
            <option value="public">Todos</option>
            <option value="private">Solo yo</option>
            <option value="team">Mi equipo</option>
          </select>
        </label>
        <button
          type="button"
          style={styles.btn}
          onClick={() => saveSection("privacy", privacy)}
        >
          Guardar Privacidad
        </button>
      </div>

      {/* Integraciones */}
      <div style={styles.card}>
        <h3 style={styles.h3}>Integraciones</h3>
        <label style={styles.label}>
          Conectar con:
          <select
            value={integration}
            onChange={e => setIntegration(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecciona una integración</option>
            <option value="google">Google</option>
            <option value="dropbox">Dropbox</option>
            <option value="slack">Slack</option>
          </select>
        </label>
        <button
          type="button"
          style={styles.btn}
          onClick={() => saveSection("integration", integration)}
        >
          Guardar Integración
        </button>
      </div>
    </div>
  );
}