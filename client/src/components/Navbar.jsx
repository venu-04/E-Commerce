

import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">Ecom</Link>
      <div className="flex gap-6">
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        {user ? (
          <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

