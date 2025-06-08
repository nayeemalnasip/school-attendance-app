import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase.config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const AdminUserList = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      if (user?.uid) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    };
    checkRole();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      };
      fetchUsers();
    }
  }, [isAdmin]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
      Swal.fire("Deleted!", "User has been removed.", "success");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-indigo-900 text-white text-lg">
        Verifying admin access...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-100 text-red-600 font-semibold text-lg px-4 text-center">
        Access Denied: Admin Only
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | পাঠশালা</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white px-4 sm:px-6 md:px-10 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold">Admin User Management</h1>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-xl text-black w-full sm:w-80 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-lg backdrop-blur-xl bg-white/10 border border-white/20">
            <table className="min-w-full table-auto text-left text-sm">
              <thead className="text-white uppercase tracking-wider">
                <tr className="border-b border-white/20">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 border-b border-white/10">
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4 break-all">{u.email}</td>
                    <td className="px-6 py-4 capitalize">{u.role}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-white">
                      No matching users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminUserList;
