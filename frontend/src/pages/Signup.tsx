import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    keepSignedIn: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/login");

      console.log("API response:", response.data);
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(
        `Signup failed: ${error.response?.data?.message || "Server error"}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-6 py-12">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Branding */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">
              Globetripster
            </span>
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* 👁️ Placeholder for eye icon */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                  -1.274 4.057-5.064 7-9.542 7
                  -4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>

          <div className="flex items-center">
            <input
              id="keepSignedIn"
              type="checkbox"
              name="keepSignedIn"
              checked={formData.keepSignedIn}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="keepSignedIn"
              className="ml-2 text-sm text-gray-400"
            >
              Keep me signed in
            </label>
          </div>

          <p className="text-xs text-gray-500">
            This keeps you signed in on this device. Avoid on shared devices.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t w-full border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="border-t w-full border-gray-300" />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/google")
            }
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-full transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.1h146.9c-6.3 33.9-25 62.6-53.3 82l86.1 67.1c50.1-46.2 81.8-114.4 81.8-194z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-86.1-67.1c-24 16.1-54.8 25.7-92 25.7-70.7 0-130.6-47.7-152-111.8l-89 68.5c43.9 87.5 134.1 150.1 241 150.1z"
              />
              <path
                fill="#FBBC05"
                d="M120 325.7c-10.5-30.9-10.5-64.1 0-95l-89-68.5c-39.1 76.9-39.1 167.1 0 244z"
              />
              <path
                fill="#EA4335"
                d="M272 107.7c39.5 0 75.1 13.6 103.1 40.3l77.4-77.4C405.6 24.1 344.6 0 272 0 165.1 0 74.9 62.6 31 150.1l89 68.5c21.4-64.1 81.3-111.8 152-111.8z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>
          ,{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy
          </a>
          , and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Rewards
          </a>
          .
        </p>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
