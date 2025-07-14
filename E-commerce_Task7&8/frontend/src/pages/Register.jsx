import React, { useState } from "react";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.webp"; // Adjust the path if needed
import { toast } from "sonner";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(registerUser({ name, email, password }));


    // You can replace this with API call
    toast.success("Registration successful!");

    // Clear form
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <section className="w-full grid md:grid-cols-2 items-center">
      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center px-6 md:px-12 h-[650px] bg-white">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Join Shopnow</h1>
          <p className="text-gray-600 text-sm">
            Create your account to start shopping
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="h-[650px] w-full hidden md:block">
        <img
          src={registerImage}
          alt="Register Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
