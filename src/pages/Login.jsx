import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      Swal.fire("Missing!", "Please fill in all fields", "warning");
      return;
    }
    try {
      setLoading(true);
      const res = await login(email, password);
      const uid = res.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const role = userSnap.exists() ? userSnap.data().role : "";
      Swal.fire("Success!", "Login successful", "success");
      if (role === "admin") navigate("/admin");
      else if (role === "teacher") navigate("/teacher-dashboard");
      else if (role === "student") navigate("/student-dashboard");
      else if (role === "guardian") navigate("/guardian-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLogin();
      Swal.fire("Success!", "Google login successful", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] flex items-center justify-center px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.3)] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600 flex items-center justify-center text-white p-6 md:p-10">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="text-4xl font-extrabold tracking-wide">পাঠশালা</div>
            <p className="text-base max-w-md mx-auto text-white/80 leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-white">Digital Attendance System</span> of{" "}
              <span className="text-indigo-200 font-medium">পাঠশালা</span> — a modern platform to manage{" "}
              <span className="underline underline-offset-4 decoration-indigo-300">attendance</span>,{" "}
              <span className="underline underline-offset-4 decoration-indigo-300">roles</span>, and{" "}
              <span className="underline underline-offset-4 decoration-indigo-300">student data</span>{" "}
              seamlessly.
            </p>
            <p className="text-sm text-indigo-200 italic tracking-wide mt-4">
              Empowering classrooms through digital innovation
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-10 bg-white/20 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-10"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Login to <span className="text-indigo-600">পাঠশালা</span>
            </h2>
            <p className="text-sm text-center text-gray-500 mb-6">
              Please enter your credentials to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  required
                  className="peer w-full px-4 pt-5 pb-2 text-sm bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email Address
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="peer w-full px-4 pt-5 pb-2 pr-10 text-sm bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 cursor-pointer text-xl text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-indigo-600" /> Remember me
                </label>
                <Link className="text-indigo-600 hover:underline whitespace-nowrap" to="#">
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-indigo-300 cursor-wait"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:brightness-110"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <motion.button
              onClick={handleGoogleLogin}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition bg-white shadow-[2px_2px_12px_rgba(0,0,0,0.05)]"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </motion.button>

            <p className="text-sm text-center text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-400 text-center mt-3">Need help? Contact your school admin.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
