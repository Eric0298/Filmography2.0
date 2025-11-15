import DeleteButton from "./buttons/DeleteButton";

export default function Film({ film, onDelete, onEdit }) {
  return (
    <div className="relative bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
      <div className="absolute top-2 right-2">
        <DeleteButton onClick={() => onDelete(film.id)} />
      </div>

      <img
        src={film.image}
        alt={film.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-100">{film.name}</h3>
        <p className="text-sm text-gray-400">{film.year}</p>

        <button
          onClick={() => onEdit(film)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded mt-2"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
