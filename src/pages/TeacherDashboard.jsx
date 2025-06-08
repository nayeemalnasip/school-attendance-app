import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserCheck, FaCalendarAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard | পাঠশালা</title>
      </Helmet>

      <div className="pt-32 px-4 sm:px-6 md:px-8 pb-20 min-h-screen bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-xl tracking-wide">
             Welcome, <span className="text-indigo-200">{user?.email || "Teacher"}</span>
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base mt-2">
            Your personalized dashboard for attendance and schedule management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Take Attendance",
              desc: "Click here to mark today’s class attendance.",
              icon: <FaUserCheck className="text-5xl text-indigo-300" />,
            },
            {
              title: "Total Classes",
              desc: "You are assigned to 5 sections.",
              icon: <FaChalkboardTeacher className="text-5xl text-purple-300" />,
            },
            {
              title: "Upcoming Schedule",
              desc: "Next class: Math at 11:00 AM",
              icon: <FaCalendarAlt className="text-5xl text-green-300" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-start gap-5 transition-all hover:bg-white/20"
            >
              {item.icon}
              <div>
                <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                <p className="text-sm text-white/80 leading-snug">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
