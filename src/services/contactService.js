const API_FLASK = "http://127.0.0.1:5000/contact";

// Obtener todos los contactos
export async function getContacts() {
  const response = await fetch(API_FLASK);
  if (!response.ok) {
    throw new Error("Error al obtener contactos");
  }
  return await response.json();
}

// Crear un nuevo contacto
export async function createContact(contactData) {
  const response = await fetch(API_FLASK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error("Error al crear contacto");
  }
  return await response.json();
}
