import { useState } from "react";

export default function Filters({ onFilter }) {
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const applyFilters = () => {
    onFilter({ category, min, max });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded w-1/3"
        onChange={(e) => onFilter({ search: e.target.value })}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>

      <input
        type="number"
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="border p-2 rounded w-20"
      />
      <input
        type="number"
        placeholder="Max"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="border p-2 rounded w-20"
      />

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}
