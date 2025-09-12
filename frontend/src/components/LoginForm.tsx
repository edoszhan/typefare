"use client";
import { useState } from "react";
import Image from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col bg-[#FFFFF] text-white p-10 rounded-lg shadow-lg w-full max-w-lg">
      {/* Login Heading */}
      <h2 className="text-2xl font-bold text-center">Login to your account</h2>
      <p className="text-sm text-gray-400 text-center mb-6">
        Enter your email below to login
      </p>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 rounded-md bg-[#1E293B] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 rounded-md bg-[#1E293B] border border-gray-600 text-white focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition">
        Login
      </button>

      {/* Divider */}
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="px-3 text-lg text-gray-400">Or continue with</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      {/* Google Login Button */}
      <button className="w-full flex items-center justify-center bg-white text-gray-800 font-bold py-2 rounded-md transition hover:bg-gray-200">
        <Image src="/google.png" alt="Google Logo" width={20} height={20} className="mr-2" />
        Login with Google
      </button>

      {/* Signup Redirect */}
      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-400 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
