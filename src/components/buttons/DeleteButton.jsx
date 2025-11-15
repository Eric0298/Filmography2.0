export default function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-red-400 hover:text-red-600 font-bold text-lg"
      title="Eliminar"
    >
      Eliminar
    </button>
  );
}
