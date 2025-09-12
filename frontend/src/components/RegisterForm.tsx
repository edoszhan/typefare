"use client";

import { useState } from "react";
import Image from "next/image";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tshirtSize, setTshirtSize] = useState("M");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateUsername = (value: string) => /^[a-zA-Z0-9]{4,12}$/.test(value);
  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  return (
    <div className="flex flex-col bg-[#FFFFF] text-white p-10 rounded-lg shadow-lg w-full max-w-lg">
      {/* Register Heading */}
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>
      <p className="text-sm text-gray-400 text-center mb-6">
        Enter your details below to register
      </p>

      {/* Username Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-4 py-2 rounded-md bg-[#0B0E13] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!validateUsername(username) && username.length > 0 && (
          <p className="text-red-400 text-xs mt-1">
            Username must be 4-12 characters, letters and numbers only.
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 rounded-md bg-[#0B0E13] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!validateEmail(email) && email.length > 0 && (
          <p className="text-red-400 text-xs mt-1">Invalid email format.</p>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 rounded-md bg-[#0B0E13] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 pr-10"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ WebkitTextSecurity: "disc", fontFamily: "monospace" }}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>

      {/* T-Shirt Size Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1" htmlFor="tshirt-size">
          T-Shirt Size
        </label>
        <select
          id="tshirt-size"
          className="w-full px-4 py-2 rounded-md bg-[#0B0E13] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
          value={tshirtSize}
          onChange={(e) => setTshirtSize(e.target.value)}
        >
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="2XL">2XL</option>
        </select>
      </div>

      {/* Register Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition"
        disabled={!validateUsername(username) || !validateEmail(email) || password.length < 6}
      >
        Register
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <a href="/auth" className="text-blue-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
