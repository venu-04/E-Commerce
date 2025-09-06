
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ min: "", max: "", category: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/items`, { params: filters });
    setProducts(res.data);
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input type="number" placeholder="Min Price"
          className="border px-2 py-1 rounded"
          onChange={(e) => setFilters({ ...filters, min: e.target.value })}
        />
        <input type="number" placeholder="Max Price"
          className="border px-2 py-1 rounded"
          onChange={(e) => setFilters({ ...filters, max: e.target.value })}
        />
        <input type="text" placeholder="Category"
          className="border px-2 py-1 rounded"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <button onClick={fetchProducts} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Apply
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-500">₹{p.price}</p>
            <p className="text-sm text-gray-400">{p.category}</p>
            <button
              className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => addToCart(p._id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  async function addToCart(productId) {
    await axios.post(`${process.env.REACT_APP_API_URL}/cart/add`, { productId }, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    alert("Item added to cart!");
  }
}
