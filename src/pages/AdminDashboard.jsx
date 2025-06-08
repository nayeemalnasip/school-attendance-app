import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaClipboardList,
} from "react-icons/fa";

const AdminDashboard = () => {
  const totalUsers = 56;
  const totalStudents = 35;
  const totalTeachers = 10;
  const totalGuardians = 11;
  const totalAttendanceEntries = 420;

  const cards = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <FaUsers className="text-4xl text-indigo-400" />,
      border: "border-indigo-400/30",
    },
    {
      label: "Students",
      value: totalStudents,
      icon: <FaUserGraduate className="text-4xl text-blue-400" />,
      border: "border-blue-400/30",
    },
    {
      label: "Teachers",
      value: totalTeachers,
      icon: <FaChalkboardTeacher className="text-4xl text-purple-400" />,
      border: "border-purple-400/30",
    },
    {
      label: "Guardians",
      value: totalGuardians,
      icon: <FaUserShield className="text-4xl text-green-400" />,
      border: "border-green-400/30",
    },
    {
      label: "Attendance Entries",
      value: totalAttendanceEntries,
      icon: <FaClipboardList className="text-4xl text-rose-400" />,
      border: "border-rose-400/30",
      full: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | পাঠশালা</title>
      </Helmet>

      <div className="pt-32 px-4 sm:px-6 pb-20 min-h-screen bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-xl tracking-wide">
            Admin Dashboard
          </h1>
          <p className="text-indigo-200 text-sm mt-2">
            Visual overview of key metrics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 sm:p-8 bg-white/10 backdrop-blur-xl border ${card.border} rounded-3xl shadow-lg ${
                card.full ? "sm:col-span-2" : ""
              } flex flex-col justify-center items-center text-center hover:scale-[1.03] transition-all duration-300`}
            >
              <div className="mb-3">{card.icon}</div>
              <h3 className="text-lg font-semibold text-white/90 tracking-wide">
                {card.label}
              </h3>
              <p className="text-4xl font-extrabold mt-2 text-white">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
