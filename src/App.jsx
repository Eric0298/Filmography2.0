import { useEffect, useState } from "react";
import { FilmsAPI } from "./api/films";
import FormNewFilm from "./components/FormNewFilm";
import GridFilms from "./components/GridFilms";

export default function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await FilmsAPI.getAll();
        setFilms(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async ({ name, image, year }) => {
    try {
      setSaving(true);
      const created = await FilmsAPI.create({
        name,
        image,
        year: Number(year),
      });
      setFilms((prev) => [created, ...prev]);
    } catch (e) {
      alert("Error creando: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  // Preparar edición (cargar peli en el formulario)
  const handleStartEdit = (film) => setEditing(film);

  const handleUpdate = async (film) => {
    try {
      setSaving(true);
      const updated = await FilmsAPI.update(film.id, {
        name: film.name,
        image: film.image,
        year: Number(film.year),
      });
      setFilms((prev) => prev.map((f) => (f.id === film.id ? updated : f)));
      setEditing(null);
    } catch (e) {
      alert("Error actualizando: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("¿Seguro que quieres borrar esta película?");
    if (!ok) return;
    try {
      setSaving(true);
      await FilmsAPI.remove(id);
      setFilms((prev) => prev.filter((f) => f.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (e) {
      alert("Error borrando: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Filmography</h1>

      {/* Formulario: crea o actualiza según haya editing o no */}
      <FormNewFilm
        key={editing?.id || "create"}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingFilm={editing}
        saving={saving}
      />

      {loading ? (
        <p className="text-center text-gray-400 mt-6">Cargando…</p>
      ) : error ? (
        <p className="text-center text-red-400 mt-6">{error}</p>
      ) : (
        <GridFilms
          films={films}
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      )}
    </div>
  );
}
