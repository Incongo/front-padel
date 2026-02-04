const API_URL = "https://tu-backend.com"; // cambia esto por tu dominio real

// ========== USUARIOS ==========
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function crearUsuario(data) {
  const res = await fetch(`${API_URL}/crear_usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function eliminarUsuario(id) {
  await fetch(`${API_URL}/eliminar_usuario/${id}`, { method: "DELETE" });
}

// ========== PISTAS ==========
export async function getPistas() {
  const res = await fetch(`${API_URL}/pistas`);
  return res.json();
}

export async function crearPista(data) {
  const res = await fetch(`${API_URL}/crear_pista`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function eliminarPista(id) {
  await fetch(`${API_URL}/eliminar_pista/${id}`, { method: "DELETE" });
}

// ========== RESERVAS ==========
export async function getReservas() {
  const res = await fetch(`${API_URL}/reservas`);
  return res.json();
}
