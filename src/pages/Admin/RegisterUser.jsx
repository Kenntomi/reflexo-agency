import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !ciudad || !empresa || !telefono) {
      toast.error("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    // Separa nombre y apellido
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    try {
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        ciudad,
        empresa,
        telefono,
      };

      // Guardar en localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Notificar a otros componentes
      window.dispatchEvent(new CustomEvent('userRegistered', {
        detail: { user: newUser, allUsers: updatedUsers }
      }));

      toast.success("Usuario registrado exitosamente");

      // Limpiar formulario
      setFullName("");
      setEmail("");
      setCiudad("");
      setEmpresa("");
      setTelefono("");

      // Navegar a la tabla de usuarios
      navigate("/admin/users");
    } catch (err) {
      console.error("Error en registro:", err);
      toast.error("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Registro de nuevo usuario</h2>
        <input
          type="text"
          placeholder="Nombre y Apellido"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
        <p className="form-link">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}