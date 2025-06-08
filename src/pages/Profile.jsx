// This Profile page supports editable name and phone, and displays readonly email and role.
// Designed with a modern international UI feel using Tailwind and framer-motion.

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || user.email || "",
            role: data.role || "",
          });
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: formData.name,
        phone: formData.phone,
      });
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-white bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] px-4 text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile | পাঠশালা</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl text-white p-6 sm:p-10 space-y-10"
        >
          {/* User Avatar and Info */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-semibold shadow-lg ring-4 ring-white/20">
              {getInitials(formData.name)}
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-semibold">{formData.name}</h2>
              <p className="text-indigo-200 text-sm capitalize">{formData.role}</p>
              <p className="text-indigo-300 text-xs break-words">{formData.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-indigo-100 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-100 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-100 mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                disabled
                className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-600 border border-gray-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-100 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                disabled
                className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-600 border border-gray-300 cursor-not-allowed"
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-indigo-300 cursor-wait"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] hover:brightness-110 shadow-lg"
              }`}
            >
              {loading ? "Saving..." : "Update Profile"}
            </motion.button>
          </form>

          {/* Optional Future Section */}
          <div className="text-center text-xs text-indigo-300">
            Profile information is securely synced with Firebase
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
