// Servicio de usuarios usando localStorage

export async function getUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users;
}

export async function createUser(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const newUser = { ...user, id: Date.now() };
  const updatedUsers = [...users, newUser];
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return newUser;
}

export async function updateUser(id, user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const updatedUsers = users.map(u => u.id === id ? { ...u, ...user } : u);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return updatedUsers.find(u => u.id === id);
}

export async function deleteUser(id) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const updatedUsers = users.filter(u => u.id !== id);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return true;
}