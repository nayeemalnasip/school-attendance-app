import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white px-4 sm:px-6 pt-28 pb-20 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-3xl"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-xl tracking-tight">
          📚 স্বাগতম <span className="text-indigo-300">পাঠশালা</span>-তে
        </h1>
        <p className="text-base sm:text-lg text-indigo-100 leading-relaxed">
          একটি আধুনিক School Attendance এবং Student Management সিস্টেম, যা Admin, Teacher, Student এবং Guardian দের জন্য আলাদা Dashboard ও Role ভিত্তিক Access প্রদান করে।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login Now
          </Link>
          <Link
            to="/signup"
            className="relative inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-2"
      >
        {[
          { title: "🎛️ Admin Dashboard", desc: "Manage users, roles, and monitor the entire system." },
          { title: "👩‍🏫 Teacher Panel", desc: "Mark attendance and manage assigned classes easily." },
          { title: "🎓 Student Area", desc: "Track your attendance & view personal dashboard." },
          { title: "👨‍👩‍👧 Guardian Portal", desc: "Stay updated about your child’s progress & presence." },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 text-indigo-100">{card.title}</h3>
            <p className="text-sm text-indigo-200">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center max-w-xl text-indigo-100 px-4">
        <p className="italic mb-2">
          “পাঠশালা ব্যবহারে আমাদের স্কুলের উপস্থিতির হার অনেক বেড়েছে।”
        </p>
        <p className="text-indigo-300 font-medium">— স্কুল প্রধান, Ideal Academy</p>
      </div>

      <footer className="mt-20 pt-6 border-t border-indigo-800/60 w-full text-center text-sm text-indigo-200">
        &copy; {new Date().getFullYear()} পাঠশালা. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
