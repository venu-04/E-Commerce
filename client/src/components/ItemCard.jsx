import axios from "axios";

export default function ItemCard({ item }) {
  const token = localStorage.getItem("token");

  const addToCart = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { itemId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item added to cart");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-500">₹{item.price}</p>
      <button
        onClick={addToCart}
        className="bg-green-600 text-white mt-2 px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
