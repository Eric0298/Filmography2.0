import { useEffect, useState } from "react";
import CreateButton from "./buttons/CreateButton";
import UpdateButton from "./buttons/UpdateButton";

const FORMULARIO_INICIAL = { name: "", year: "", image: "" };

export default function FormNewFilm({
  onCreate,
  onUpdate,
  editingFilm,
  saving,
}) {
  const [form, setForm] = useState(FORMULARIO_INICIAL);

  useEffect(() => {
    if (editingFilm) {
      setForm({
        id: editingFilm.id,
        name: editingFilm.name,
        year: String(editingFilm.year),
        image: editingFilm.image,
      });
    } else {
      setForm(FORMULARIO_INICIAL);
    }
  }, [editingFilm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const name = form.name.trim();
    const image = form.image.trim();
    const year = Number(form.year);

    if (!name || !image || !year) return;

    if (editingFilm) {
      onUpdate({ id: form.id, name, image, year });
    } else {
      onCreate({ name, image, year });
    }
  };

  const disabled = saving || !form.name || !form.image || !form.year;

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-md mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Film Name"
          className="flex-1 p-2 rounded bg-slate-900 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          className="w-28 p-2 rounded bg-slate-900 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Film Poster URL"
        className="w-full p-2 rounded bg-slate-900 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 mb-4"
      />

      {editingFilm ? (
        <UpdateButton onClick={handleSubmit} disabled={disabled} />
      ) : (
        <CreateButton onClick={handleSubmit} disabled={disabled} />
      )}
    </div>
  );
}
