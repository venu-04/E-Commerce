

import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setCart(res.data);
  };

  async function removeFromCart(id) {
    await axios.post(`${process.env.REACT_APP_API_URL}/cart/remove`, { productId: id }, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    fetchCart();
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((c) => (
            <div key={c._id} className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-white">
              <div>
                <h2 className="font-semibold">{c.name}</h2>
                <p className="text-gray-500">₹{c.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(c._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
