// src/api/apiClient.js

const API_URL = "https://incongo.pythonanywhere.com/";

// === TOKEN ===
function getToken() {
  return localStorage.getItem("token");
}

// === FETCH GENERAL ===
async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, config);

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || "Error en la petición");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}

// === ENDPOINTS ===

// LOGIN
export function loginRequest(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// REGISTER
export function registerRequest(nombre, dni, email, password) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ nombre, dni, email, password }),
  });
}

// GET USER
export function getMeRequest() {
  return apiFetch("/auth/me");
}

// CREAR RESERVA
export function createReservaRequest(pista_id, fecha, horarios) {
  return apiFetch("/api/reservas", {
    method: "POST",
    body: JSON.stringify({
      pista_id,
      fecha,
      horarios,
    }),
  });
}

// DISPONIBILIDAD
export function getDisponibilidadRequest(fecha) {
  return apiFetch("/api/disponibilidadfecha", {
    method: "POST",
    body: JSON.stringify({ fecha }),
  });
}

// HORARIOS
export function getHorariosRequest() {
  return apiFetch("/api/horarios");
}

// PISTAS
export function getPistasRequest() {
  return apiFetch("/api/pistas");
}

// TODAS LAS RESERVAS (admin)
export function getReservasRequest() {
  return apiFetch("/api/reservas");
}

// BORRAR RESERVA
export function deleteReservaRequest(reserva_id) {
  return apiFetch(`/api/reservas/${reserva_id}`, {
    method: "DELETE",
  });
}

// === MIS RESERVAS (usuario autenticado) ===
export function getMisReservasRequest() {
  return apiFetch("/api/reservas/mias", {
    method: "GET",
  });
}

// CANCELAR RESERVA DEL USUARIO
export function cancelarReservaRequest(id) {
  return apiFetch(`/api/reservas/${id}`, {
    method: "DELETE",
  });
}
