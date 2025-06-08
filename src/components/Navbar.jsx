import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FiMenu, FiX } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { FaSchool } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire("Logged out", "You have been signed out", "success");
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isActive = (path) => location.pathname === path;

  const roleButtons = [
    { to: "/admin", label: "Admin", color: "from-indigo-500 to-purple-600" },
    { to: "/teacher-dashboard", label: "Teacher", color: "from-purple-500 to-pink-500" },
    { to: "/student-dashboard", label: "Student", color: "from-blue-500 to-indigo-600" },
    { to: "/guardian-dashboard", label: "Guardian", color: "from-green-400 to-emerald-600" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-tr from-[#0e0e2e] via-[#181837] to-[#2f2f68] backdrop-blur-xl border-b border-white/10 shadow-[0_6px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-3 text-white font-black tracking-wide text-xl sm:text-2xl flex-shrink-0"
        >
          <FaSchool className="text-white text-3xl drop-shadow-xl" />
          <span className="font-extrabold text-white drop-shadow whitespace-nowrap">পাঠশালা</span>
        </Link>

        <div className="flex items-center gap-4 flex-grow md:flex-grow-0 justify-end w-full md:w-auto">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="text-white text-xl hover:scale-110 transition duration-300 hover:text-yellow-300 flex-shrink-0"
            aria-label="Toggle Theme"
          >
            {darkMode ? <BsSun className="transition-all duration-300 scale-110" /> : <BsMoon className="transition-all duration-300" />}
          </button>

          <nav className="hidden md:flex items-center gap-4 flex-wrap justify-end">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-tr from-sky-500 to-indigo-500 hover:scale-105 transition whitespace-nowrap ${isActive("/dashboard") ? "ring-2 ring-white/50" : ""}`}
                >
                  Dashboard
                </Link>
                {roleButtons.map((btn) => (
                  <Link
                    key={btn.to}
                    to={btn.to}
                    className={`px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-tr ${btn.color} hover:scale-105 transition whitespace-nowrap ${isActive(btn.to) ? "ring-2 ring-white/50" : ""}`}
                  >
                    {btn.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-tr from-red-500 to-red-600 hover:scale-105 transition whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-tr from-blue-500 to-indigo-600 hover:scale-105 transition whitespace-nowrap">Login</Link>
                <Link to="/signup" className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-tr from-green-400 to-emerald-600 hover:scale-105 transition whitespace-nowrap">Signup</Link>
              </>
            )}
          </nav>

          <button onClick={toggleMenu} className="text-white md:hidden text-3xl flex-shrink-0">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 space-y-3 bg-[#1a1a3f]/90 backdrop-blur-xl border-t border-white/10 rounded-b-xl">
          {user ? (
            <>
              <Link onClick={closeMenu} to="/dashboard" className="block text-center py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition">Dashboard</Link>
              {roleButtons.map((btn) => (
                <Link
                  key={btn.to}
                  onClick={closeMenu}
                  to={btn.to}
                  className={`block text-center py-2 rounded-xl bg-gradient-to-tr ${btn.color} text-white hover:brightness-110 transition`}
                >
                  {btn.label}
                </Link>
              ))}
              <button onClick={handleLogout} className="block w-full text-center py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">Logout</button>
            </>
          ) : (
            <>
              <Link onClick={closeMenu} to="/login" className="block text-center py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">Login</Link>
              <Link onClick={closeMenu} to="/signup" className="block text-center py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">Signup</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
