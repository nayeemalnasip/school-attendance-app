import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

function Signup() {
  const { signup } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value.trim();
    const password = form.password?.value;
    const phone = form.phone?.value?.trim();
    const role = form.role?.value;

    if (!email || !password || !phone || !role) {
      Swal.fire("Missing!", "Please fill in all fields.", "warning");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email || "",
        phone: phone || "",
        role: role || "",
      });

      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        Swal.fire("Email already in use", "Please try logging in instead.", "warning");
      } else {
        Swal.fire("Error!", err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-[#1e1b4b] via-[#302d89] to-[#3c2ea7] flex items-center justify-center px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 text-white p-6 md:p-10 rounded-[28px] shadow-[0_12px_50px_rgba(0,0,0,0.45)]"
      >
        <h2 className="text-4xl font-black text-center mb-3 tracking-tight drop-shadow-md">
          Create Your Account
        </h2>
        <p className="text-center text-indigo-100 mb-6 text-sm">
          Sign up to access your personalized dashboard.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              required
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 text-sm bg-white text-gray-800 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4">
              Email Address
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="tel"
              name="phone"
              required
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 text-sm bg-white text-gray-800 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4">
              Phone Number
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <select
              name="role"
              required
              className="peer w-full px-4 pt-5 pb-2 text-sm bg-white text-gray-800 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled hidden>
                -- Select Role --
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="guardian">Guardian</option>
              <option value="admin">Admin</option>
            </select>
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-4">
              Role
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 pr-10 text-sm bg-white text-gray-800 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4">
              Password
            </label>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 cursor-pointer text-xl text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-2xl transition-all duration-300 ${
              loading
                ? "bg-indigo-300 cursor-wait"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:brightness-110 shadow-2xl"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-indigo-100 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="underline font-medium text-white hover:text-indigo-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
