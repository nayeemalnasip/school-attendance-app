import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaChartBar, FaEnvelopeOpenText } from "react-icons/fa";

const GuardianDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>Guardian Dashboard | পাঠশালা</title>
      </Helmet>

      <div className="pt-32 px-4 sm:px-6 md:px-8 pb-20 min-h-screen bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-xl tracking-wide">
            🧑‍👧 Welcome, <span className="text-indigo-200">{user?.email || "Guardian"}</span>
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base mt-2">
            Monitor your child’s attendance and stay informed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <FaChartBar className="text-5xl text-indigo-300" />,
              title: "Attendance Report",
              desc: "Check your child’s presence and performance report.",
            },
            {
              icon: <FaEnvelopeOpenText className="text-5xl text-green-300" />,
              title: "Teacher's Message",
              desc: "“Your child was attentive and performed well today.”",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-start gap-5 hover:bg-white/20"
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

export default GuardianDashboard;
