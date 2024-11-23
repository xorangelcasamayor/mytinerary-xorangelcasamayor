// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../store/actions/authActions"; 
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaGoogle } from "react-icons/fa";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   const { loading, error, token } = useSelector((state) => state.auth);

//   useEffect(() => {
    
//     if (token) {
//       navigate("/cities");
//     }
//   }, [token, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   const handleGoogleLogin = () => {
   
//     window.location.href = "http://localhost:8080/api/auth/signin/google";
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: 'url("../public/vecteezy_ai-generated-travelling-to-thailand-advertisment-background_37248582.jpg")'
//       }}
//     >
//       <div className="flex items-center justify-center min-h-screen flex-col">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-sm p-6 space-y-4 bg-[#011f26] rounded-lg shadow-md"
//         >
//           <h2 className="text-2xl font-semibold text-center text-white">
//             Iniciar sesión
//           </h2>
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-300">
//               Email:
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-300">
//               Contraseña:
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           >
//             {loading ? "Cargando..." : "Iniciar sesión"}
//           </button>
//           {error && <p className="text-center text-red-500">{error}</p>}

//           <button
//             onClick={handleGoogleLogin} 
//             className="w-full py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center space-x-2 mt-4"
//           >
//             <FaGoogle size={20} /> 
//             <span>Iniciar sesión con Google</span>
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <motion.div
//             whileHover={{
//               scale: 1.1,
//               opacity: 0.8,
//               transition: { duration: 0.3 },
//             }}
//             whileTap={{
//               scale: 0.95,
//               opacity: 1,
//             }}
//             animate={{
//               rotate: [0, 2, -2, 0],
//             }}
//             transition={{
//               duration: 1,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           >
//             <p className="text-black text-2xl font-semibold">
//               ¿No tienes una cuenta?{" "}
//               <a href="/signup" className="text-black hover:underline ml-2">
//                 Crear cuenta
//               </a>
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/authActions"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || ""); // Cargar el correo guardado
  const [password, setPassword] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/cities");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      dispatch(login({ email, password }));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/signin/google";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

   
    if (value.includes('@')) {
      setEmailSuggestions([]);
    } else {
    
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmailSuggestions([storedEmail]);
      } else {
        setEmailSuggestions([]);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length >= 8) {
      setPasswordError(""); 
    }
  };

 
  useEffect(() => {
    if (error) {
      
      if (error.includes("Invalid credentials")) {
        setErrorMessage("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
      } else {
        setErrorMessage("Ocurrió un error al intentar iniciar sesión. Por favor, intenta más tarde.");
      }
    }
  }, [error]);

  
  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    }
  }, [email]);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("../public/vecteezy_ai-generated-travelling-to-thailand-advertisment-background_37248582.jpg")'
      }}
    >
      <div className="flex items-center justify-center min-h-screen flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-6 space-y-4 bg-[#011f26] rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center text-white">
          LOGIN
          </h2>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {emailSuggestions.length > 0 && (
              <ul className="mt-2 text-sm text-gray-300">
                {emailSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:underline"
                    onClick={() => setEmail(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={8} 
              className="w-full px-4 py-2 text-white bg-[#011f26] border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-400 mt-1">
            The password must be at least 4 characters.
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          
         
          {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

          <button
            onClick={handleGoogleLogin} 
            className="w-full py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center space-x-2 mt-4"
          >
            <FaGoogle size={20} /> 
            <span>Sign in with Google</span>
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
              <a href="/signup" className="text-black hover:underline ml-2">
                Sign up
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

