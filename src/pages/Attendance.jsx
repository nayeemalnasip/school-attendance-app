import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Attendance = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Attendance Submitted",
        text: "The attendance record has been saved.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Attendance | পাঠশালা</title>
      </Helmet>

      <div className="min-h-screen pt-28 px-4 pb-20 bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto bg-white/10 text-white backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] p-6 sm:p-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 drop-shadow-xl tracking-wider">
             Mark Attendance
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 font-medium text-white/90">Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium text-white/90">Class Name</label>
                <input
                  type="text"
                  placeholder="e.g., Grade 5 - A"
                  required
                  className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 font-medium text-white/90">Student Name</label>
                <input
                  type="text"
                  placeholder="e.g., Irza Khan"
                  required
                  className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium text-white/90">Status</label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="">-- Select Status --</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium text-white/90">Note (optional)</label>
              <textarea
                rows={3}
                placeholder="Any notes about this student..."
                className="w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-indigo-300 cursor-wait"
                  : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.02] hover:brightness-110 shadow-xl"
              }`}
            >
              {loading ? "Saving..." : "Submit Attendance"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Attendance;
