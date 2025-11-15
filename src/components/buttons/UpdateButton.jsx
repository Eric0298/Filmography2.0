export default function UpdateButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-3 py-1 text-sm rounded mt-2"
    >
      {disabled ? "Guardando..." : "Guardar cambios"}
    </button>
  );
}
