import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";

// Demo mode used to skip Firebase checks during testing
const demoMode = true;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (demoMode) {
      setLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const role = docSnap.data().role;
          if (role === "admin") navigate("/admin");
          else if (role === "teacher") navigate("/teacher-dashboard");
          else if (role === "student") navigate("/student-dashboard");
          else if (role === "guardian") navigate("/guardian-dashboard");
          else navigate("/profile");
        } else {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 text-white px-4">
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold">Loading Dashboard</h1>
          <p className="text-indigo-200">Fetching role and preparing interface</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | পাঠশালা</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 px-4 sm:px-6 py-20 sm:py-28 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to the Dashboard</h1>
          <p className="text-indigo-200 text-base">Access key features and explore attendance tools</p>

          {/* Interactive Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            <Link
              to="/view-attendance"
              className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-200 shadow-md hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-1">View Attendance</h3>
              <p className="text-sm text-indigo-200">Check student daily records</p>
            </Link>

            <Link
              to="/attendance-summary"
              className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-200 shadow-md hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-1">Attendance Summary</h3>
              <p className="text-sm text-indigo-200">Visualize performance reports</p>
            </Link>

            <Link
              to="/profile"
              className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition duration-200 shadow-md hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-1">User Profile</h3>
              <p className="text-sm text-indigo-200">Manage your account information</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
