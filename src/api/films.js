const BASE_URL = "https://68deae0a898434f41355acae.mockapi.io";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${msg}`);
  }
  return res.json();
}

export const FilmsAPI = {
  getAll: () => request(`/PELICULASREACT`),
  create: (film) =>
    request(`/PELICULASREACT`, {
      method: "POST",
      body: JSON.stringify(film),
    }),
  update: (id, film) =>
    request(`/PELICULASREACT/${id}`, {
      method: "PUT",
      body: JSON.stringify(film),
    }),
  remove: (id) => request(`/PELICULASREACT/${id}`, { method: "DELETE" }),
};
