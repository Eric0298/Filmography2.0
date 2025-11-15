export default function CreateButton({ disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded disabled:opacity-40"
    >
      Crear
    </button>
  );
}
