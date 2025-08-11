import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/localUserService";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiUserPlus } from "react-icons/fi";
import "../App.css";

// Utilidad para autocompletar campos vacíos
function fillUserFields(user) {
  return {
    ...user,
    ciudad: user.ciudad || "Lima",
    empresa: user.empresa || "Reflexo Agency",
    telefono: user.telefono || "+51 999 888 777"
  };
}

export default function UserTable({ users, setUsers }) {
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    ciudad: '',
    empresa: '',
    telefono: ''
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromAPI = await getUsers();
        if (usersFromAPI.length > 0) {
          const completedUsers = usersFromAPI.map(fillUserFields);
          setUsers(completedUsers);
          localStorage.setItem("users", JSON.stringify(completedUsers));
        }
      } catch (error) {
        toast.error("Error al cargar los usuarios");
      }
    };

    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (Array.isArray(storedUsers) && storedUsers.length > 0 && users.length === 0) {
      const completedUsers = storedUsers.map(fillUserFields);
      setUsers(completedUsers);
    } else if (users.length === 0) {
      fetchUsers();
    }
  }, [setUsers, users.length]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("Usuario eliminado");
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUserData({ ...user });
  };

  const handleSaveEdit = async () => {
    const { firstName, lastName, email, ciudad, empresa, telefono } = userData;
    if (!firstName || !lastName || !email || !ciudad || !empresa || !telefono) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      await updateUser(editingUser, userData);
      toast.success("Usuario actualizado");
      const updatedUsers = users.map((u) =>
        u.id === editingUser ? { ...u, ...userData } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditingUser(null);
    } catch (error) {
      toast.error("Error al actualizar el usuario");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // FILTRO MEJORADO: busca por nombre, email, ciudad, empresa y teléfono
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();
    return (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      (user.ciudad && user.ciudad.toLowerCase().includes(searchText)) ||
      (user.empresa && user.empresa.toLowerCase().includes(searchText)) ||
      (user.telefono && user.telefono.toLowerCase().includes(searchText))
    );
  });

  return (
    <div className="table-wrapper" style={{ animation: "fadeIn 0.7s" }}>
      {/* Búsqueda */}
      <div className="filters" style={{ marginBottom: 18, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, email, ciudad, empresa o teléfono"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="user-search-input"
          aria-label="Buscar usuario"
          style={{
            width: "100%",
            maxWidth: "600px",
            fontSize: "1.15rem",
            padding: "12px 18px",
            borderRadius: "8px",
            border: "1.5px solid #222",
            color: "#111",
            background: "#fff",
            fontWeight: "600",
            margin: "0 auto",
            display: "block",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        />
      </div>

      {/* Formulario de edición */}
      {editingUser && (
        <div className="edit-form" style={{
          background: "var(--card-bg)",
          borderRadius: 10,
          padding: 20,
          marginBottom: 18,
          boxShadow: "var(--card-shadow)",
          animation: "fadeIn 0.5s"
        }}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 6 }}>
            <FiEdit2 /> Editar Usuario
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <input
              type="text"
              placeholder="Nombre"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 120 }}
              aria-label="Nombre"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 120 }}
              aria-label="Apellido"
            />
            <input
              type="email"
              placeholder="Correo"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 180 }}
              aria-label="Correo"
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={userData.ciudad}
              onChange={(e) => setUserData({ ...userData, ciudad: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 120 }}
              aria-label="Ciudad"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={userData.empresa}
              onChange={(e) => setUserData({ ...userData, empresa: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 120 }}
              aria-label="Empresa"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={userData.telefono}
              onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
              className="user-search-input"
              style={{ flex: 1, minWidth: 120 }}
              aria-label="Teléfono"
            />
          </div>
          <div className="edit-actions" style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button onClick={handleSaveEdit} className="profile-btn" aria-label="Guardar cambios">
              <FiUserPlus style={{ marginRight: 4 }} /> Guardar
            </button>
            <button onClick={handleCancelEdit} className="profile-btn danger" aria-label="Cancelar edición">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      <table className="user-table formal" style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "var(--card-bg)",
        borderRadius: 10,
        boxShadow: "var(--card-shadow)",
        animation: "fadeIn 0.7s"
      }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.ciudad || <span className="user-placeholder">Sin ciudad</span>}</td>
                <td>{u.empresa || <span className="user-placeholder">Sin empresa</span>}</td>
                <td>{u.telefono || <span className="user-placeholder">Sin teléfono</span>}</td>
                <td>
                  <div className="user-table-actions">
                    <button
                      onClick={() => handleEdit(u)}
                      className="profile-btn"
                      title="Editar"
                      style={{ padding: "6px 12px", fontSize: "1rem", display: "flex", alignItems: "center", gap: 4 }}
                      aria-label={`Editar usuario ${u.firstName} ${u.lastName}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="profile-btn danger"
                      title="Eliminar"
                      style={{ padding: "6px 12px", fontSize: "1rem", display: "flex", alignItems: "center", gap: 4 }}
                      aria-label={`Eliminar usuario ${u.firstName} ${u.lastName}`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No hay usuarios disponibles</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}