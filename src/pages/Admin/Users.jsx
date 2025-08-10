import React, { useState, useEffect, useContext } from "react";
import UserTable from "../../components/UserTable";
import { getUsers } from "../../services/userService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export default function Users() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        try {
          const apiUsers = await getUsers();
          if (apiUsers && apiUsers.length > 0) {
            setUsers(apiUsers);
            localStorage.setItem("users", JSON.stringify(apiUsers));
            return;
          }
        } catch (apiError) {
          console.log("No se pudieron cargar usuarios desde la API:", apiError);
        }
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
          }
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error);
        toast.error("Error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    const handleStorageChange = (e) => {
      if (e.key === "users") {
        const newUsers = e.newValue ? JSON.parse(e.newValue) : [];
        setUsers(newUsers);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleUserRegistered = (e) => {
      setUsers(e.detail.allUsers);
    };

    window.addEventListener('userRegistered', handleUserRegistered);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener('userRegistered', handleUserRegistered);
    };
  }, []);

  const updateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  // Animación y colores por tema
  const colors = {
    text: isDark ? "#f1f1f1" : "#222",
    bg: isDark ? "#18191a" : "#fff",
    btnBg: isDark ? "#414345" : "#4facfe",
    btnColor: "#fff",
    cardBg: isDark ? "#232526" : "#fff",
    cardShadow: isDark ? "0 4px 16px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.08)",
  };

  if (loading) {
    return (
      <div className="page" style={{ background: colors.bg, color: colors.text, minHeight: "100vh" }}>
        <h1 style={{ animation: "fadeIn 0.7s" }}>Lista de Usuarios</h1>
        <div className="loader-users" />
        <p style={{ textAlign: "center", marginTop: 20 }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div
      className="page"
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        animation: "fadeIn 0.7s",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Lista de Usuarios</h1>
      <p style={{ marginBottom: 24 }}>Gestiona los usuarios registrados en Reflexo Agency:</p>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
        <Link
          to="/admin/register"
          style={{
            background: colors.btnBg,
            color: colors.btnColor,
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: colors.cardShadow,
            transition: "background 0.3s, transform 0.2s",
            animation: "fadeIn 0.8s",
          }}
          className="profile-btn"
        >
          + Registrar nuevo usuario
        </Link>
      </div>
      <div
        style={{
          background: colors.cardBg,
          borderRadius: "12px",
          boxShadow: colors.cardShadow,
          padding: "2rem 1rem",
          animation: "fadeIn 0.8s",
        }}
      >
        <h2
          style={{
            color: isDark ? "#fff" : "#111", // Blanco en oscuro, negro en claro
            marginBottom: "1.5rem",
            fontWeight: "bold",
            fontSize: "1.6rem",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Gestión de Usuarios
        </h2>
        {users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No hay usuarios registrados aún.</p>
            <p>Los usuarios registrados aparecerán aquí automáticamente.</p>
          </div>
        ) : (
          <UserTable users={users} setUsers={updateUsers} />
        )}
      </div>
    </div>
  );
}