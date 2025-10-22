import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      return toast.error("Password must contain an uppercase letter.");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return toast.error("Password must contain a lowercase letter.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    try {
      const userCredential = await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Account created successfully!");
      form.reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3 p-2 border rounded"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input input-bordered w-full mb-3 p-2 border rounded"
            required
          />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        <button
          type="button"
          onClick={googleLogin}
          className="w-full border border-gray-400 mt-3 py-2 rounded hover:bg-gray-50"
        >
          Continue with Google
        </button>
        <div className="text-center mt-4 text-sm">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
