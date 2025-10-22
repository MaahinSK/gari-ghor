import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "")}>
        Home
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-blue-600 font-bold" : "")}>
        My Profile
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          ToyCarHub
        </h1>
        <div className="flex gap-5 items-center">
          {navLinks}

          {user ? (
            <div className="relative flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-image.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute top-12 bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  {user.displayName || "User"}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
