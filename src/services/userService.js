// Servicio de usuarios usando API y localStorage

const API_URL = "https://dummyjson.com/users";

export async function getUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error en la API");
    const data = await res.json();
    // Guardamos en localStorage como copia offline
    localStorage.setItem("users", JSON.stringify(data.users));
    return data.users;
  } catch (error) {
    console.warn("Usando datos de localStorage por error en API:", error);
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
}

export async function createUser(user) {
  try {
    const res = await fetch(API_URL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    // Actualizamos el almacenamiento local
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return newUser;
  } catch (error) {
    console.warn("No se pudo crear usuario en API, usando localStorage");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const newUser = { ...user, id: Date.now() };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return newUser;
  }
}

export async function updateUser(id, user) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const updatedUser = await res.json();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u => u.id === id ? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUser;
  } catch (error) {
    console.warn("No se pudo actualizar usuario en API, usando localStorage");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...user } : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers.find(u => u.id === id);
  }
}

export async function deleteUser(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(u => u.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.warn("No se pudo eliminar usuario en API, usando localStorage");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(u => u.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  }
}
