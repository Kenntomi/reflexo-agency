// src/services/authService.js

export async function login(email, password) {
  if (email === "diego@gmail.com" && password === "1234") {
    const token = "fake-jwt-token";
    localStorage.setItem("token", token);
    return { token };
  } else {
    throw new Error("Credenciales inválidas");
  }
}

export async function register(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Simular almacenamiento local
  console.log("Usuario registrado:", { name, email, password });
  return { success: true };
}
