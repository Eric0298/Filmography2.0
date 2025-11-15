import Film from "./Film";

export default function GridFilms({ films, onDelete, onEdit }) {
  if (!films.length) {
    return <p className="text-center text-gray-400 mt-6">No hay películas.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {films.map((film) => (
        <Film key={film.id} film={film} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
