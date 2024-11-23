import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../store/actions/authActions"; 
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !password || !country) {
      setError("All fields are required.");
      return;
    }

    const userData = {
      name,
      lastName,
      email,
      password,
      photoUrl,
      country,
    };

    try {
      // Dispatching register action
      await dispatch(register(userData));

      // After registering, log in with the same credentials
      await dispatch(login({ email, password }));

      setSuccess("Account created and logged in successfully!");
      setError(""); // Reset the error message
      navigate("/cities"); // Redirect to the "cities" page
    } catch (error) {
      setError("There was an error creating the account.");
      setSuccess(""); // Reset the success message
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/signin/google"; // Redirect to backend for Google login
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-16"
      style={{
        backgroundImage:
          'url("../public/vecteezy_ai-generated-travelling-to-thailand-advertisment-background_37248582.jpg")',
      }}
    >
      <div className="flex items-center justify-center min-h-screen flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-6 space-y-4 bg-[#011f26] rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center text-white">
            Create Account
          </h2>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              First Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
            Profile Photo:
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Country:
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select a Country</option>
              <option value="USA">USA</option>
              <option value="Mexico">Mexico</option>
              <option value="Spain">Spain</option>
              <option value="Canada">Canada</option>
              <option value="Argentina">Argentina</option>
              <option value="Brazil">Brazil</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Sign Up
          </button>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center space-x-2 mt-4"
          >
            <FaGoogle size={20} /> {/* Google Icon */}
            <span>Sign up with Google</span>
          </button>
        </form>

        <div className="mt-4 text-center">
          <motion.div
            whileHover={{
              scale: 1.1,
              opacity: 0.8,
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.95,
              opacity: 1,
            }}
            animate={{
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <p className="text-black text-2xl font-semibold">
              Already have an account?{" "}
              <a href="/login" className="text-black hover:underline ml-2">
                Log in
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

