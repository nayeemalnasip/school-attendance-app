import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AiOutlineCalendar, AiOutlineUser, AiOutlineTeam, AiOutlineFileText } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AttendanceSummary = () => {
  const [loading, setLoading] = useState(false);
  const [statusCounts, setStatusCounts] = useState({ present: 0, absent: 0, late: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const randomCounts = {
      present: Math.floor(Math.random() * 30),
      absent: Math.floor(Math.random() * 10),
      late: Math.floor(Math.random() * 5),
    };
    setStatusCounts(randomCounts);

    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: "Submitted",
        text: "Attendance record updated successfully.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });
    }, 1000);
  };

  const chartData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        label: "Student Status",
        data: [statusCounts.present, statusCounts.absent, statusCounts.late],
        backgroundColor: ["#10b981", "#ef4444", "#f59e0b"],
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#e0e7ff" },
        grid: { color: "#ffffff20" },
      },
      x: {
        ticks: { color: "#e0e7ff" },
        grid: { color: "#ffffff10" },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Attendance Summary | পাঠশালা</title>
      </Helmet>

      <div className="pt-28 px-4 pb-20 min-h-screen bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Attendance Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Attendance Input Panel</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-1 font-medium flex items-center gap-1">
                    <AiOutlineCalendar /> Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium flex items-center gap-1">
                    <AiOutlineTeam /> Class
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Grade 6 - B"
                    className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium flex items-center gap-1">
                    <AiOutlineUser /> Student Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Zayaan Hossain"
                    className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium">Status</label>
                  <select
                    required
                    className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 font-medium flex items-center gap-1">
                  <AiOutlineFileText /> Note (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add remarks..."
                  className="w-full px-4 py-2 bg-white text-gray-900 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-indigo-300 cursor-wait"
                    : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:scale-[1.02] hover:brightness-110 shadow-lg"
                }`}
              >
                {loading ? "Processing..." : "Submit Attendance"}
              </motion.button>
            </form>
          </div>

          {/* Attendance Chart */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 sm:p-10">
            <h3 className="text-xl font-semibold mb-4 text-center">Status Overview Chart</h3>
            <div className="w-full">
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AttendanceSummary;
