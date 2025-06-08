import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ViewAttendance = () => {
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "attendances"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(data);
      setFiltered(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = records;
    if (search.trim()) {
      result = result.filter((item) =>
        item.student.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }
    setFiltered(result);
  }, [search, statusFilter, records]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(db, "attendances", id));
        Swal.fire("Deleted!", "The record has been removed.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleEdit = async (record) => {
    const { value: newStatus } = await Swal.fire({
      title: "Update Attendance",
      input: "select",
      inputOptions: {
        Present: "Present",
        Absent: "Absent",
      },
      inputValue: record.status,
      showCancelButton: true,
    });
    if (newStatus && newStatus !== record.status) {
      try {
        await updateDoc(doc(db, "attendances", record.id), {
          status: newStatus,
        });
        Swal.fire("Updated!", "Attendance status updated.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleExport = () => {
    const exportData = filtered.map((item) => ({
      Student: item.student,
      Status: item.status,
      Date: format(item.date.toDate(), "dd MMM yyyy, h:mm a"),
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "attendance-records.xlsx");
  };

  return (
    <>
      <Helmet>
        <title>Attendance Records | পাঠশালা</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#3730a3] text-white px-4 py-24 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Attendance Records</h2>

          <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search by student name"
              className="px-4 py-2 rounded-xl text-gray-800 w-full md:w-1/2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-3 flex-col sm:flex-row w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-xl text-gray-800 w-full sm:w-40"
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <button
                onClick={handleExport}
                className="px-6 py-2 text-white font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:scale-105 hover:brightness-110 transition-all"
              >
                Download Excel
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-white/80">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-white/60 italic">No matching records found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full border-separate border-spacing-y-2 text-sm sm:text-base">
                <thead>
                  <tr className="text-white/80 uppercase">
                    <th className="p-2 text-left">Student</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => (
                    <tr key={record.id} className="bg-white/20 text-white hover:bg-white/30 transition rounded-xl">
                      <td className="p-2 rounded-l-xl break-words max-w-xs">{record.student}</td>
                      <td className="p-2">{record.status}</td>
                      <td className="p-2 whitespace-nowrap">{format(record.date.toDate(), "dd MMM yyyy, h:mm a")}</td>
                      <td className="p-2 flex flex-wrap gap-2 rounded-r-xl">
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-xs sm:text-sm font-bold py-1 px-3 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="bg-red-500 hover:bg-red-600 text-xs sm:text-sm font-bold py-1 px-3 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAttendance;
