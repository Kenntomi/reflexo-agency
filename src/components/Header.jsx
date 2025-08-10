import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { FiHome, FiUser, FiLogIn, FiLogOut } from "react-icons/fi";

export default function Header() {
    const { theme } = useContext(ThemeContext);
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
        window.location.reload();
    };

    return (
        <header className={`header ${theme}`} style={{ boxShadow: "0 2px 10px var(--form-shadow)", position: "sticky", top: 0, zIndex: 100 }}>
            <div className="logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80" alt="Reflexo Agency Logo" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <h1 style={{ margin: 0, fontWeight: "bold", letterSpacing: 1, fontSize: "1.5rem" }}>
                        Reflexo Agency
                    </h1>
                </Link>
            </div>
            <nav className="navigation" aria-label="Navegación principal">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className={location.pathname === "/" ? "active-link" : ""}
                            aria-current={location.pathname === "/" ? "page" : undefined}
                        >
                            <FiHome style={{ marginRight: 6 }} />
                            Inicio
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link
                                    to="/admin/profile"
                                    className={location.pathname === "/admin/profile" ? "active-link" : ""}
                                    aria-current={location.pathname === "/admin/profile" ? "page" : undefined}
                                >
                                    <FiUser style={{ marginRight: 6 }} />
                                    Perfil
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="profile-btn"
                                    style={{
                                        background: "#d82f2f",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                        padding: "8px 18px",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        transition: "background 0.3s, transform 0.2s"
                                    }}
                                    aria-label="Cerrar sesión"
                                    title="Cerrar sesión"
                                >
                                    <FiLogOut />
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link
                                to="/login"
                                className={location.pathname === "/login" ? "active-link" : ""}
                                aria-current={location.pathname === "/login" ? "page" : undefined}
                            >
                                <FiLogIn style={{ marginRight: 6 }} />
                                Iniciar sesión
                            </Link>
                        </li>
                    )}
                    <li style={{ marginLeft: 16 }}>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
}