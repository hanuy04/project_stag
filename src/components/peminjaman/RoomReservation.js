import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Menu, X } from "@mui/icons-material";
import index from "@/pages/pengaduan";

const RoomReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

  const [formData, setFormData] = useState({
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    ruangan: "",
    keperluan: "",
    teacher: "",
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const resResponse = await fetch("/api/reservationsCecil");
        if (!resResponse.ok) throw new Error("Failed to fetch reservations.");
        const resData = await resResponse.json();
        setReservations(resData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchRooms = async () => {
      try {
        const roomResponse = await fetch("/api/roomsCecil");
        if (!roomResponse.ok) throw new Error("Failed to fetch rooms.");
        const roomData = await roomResponse.json();
        setRooms(roomData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/usersCecil");
        if (!response.ok) throw new Error("Failed to fetch teachers.");
        const data = await response.json();
        const filteredTeachers = data.filter((teacher) =>
          teacher.username.startsWith("GR")
        );
        setTeachers(filteredTeachers);
        console.log(filteredTeachers);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTeachers();
    fetchReservations();
    fetchRooms();
  }, []);

  useEffect(() => {
    const checkEndTime = () => {
      const [hours] = formData.waktuSelesai.split(":");
      setShowTeacherDropdown(parseInt(hours) >= 17);
    };
    checkEndTime();
  }, [formData.waktuSelesai]);

  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r.room_id === roomId);
    return room ? room.room_name : "Unknown Room";
  };

  const generateTimeOptions = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const startTimeOptions = generateTimeOptions(7, 19);
  const endTimeOptions = generateTimeOptions(7, 21);
  const [showLogout, setShowLogout] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    event.preventDefault();
    const { tanggal, waktuMulai, waktuSelesai, ruangan, keperluan, teacher } =
      formData;

    if (
      !tanggal ||
      !waktuMulai ||
      !waktuSelesai ||
      !ruangan ||
      !keperluan ||
      (showTeacherDropdown && !teacher)
    ) {
      setError("Harap isi semua field sebelum mengajukan peminjaman.");
      return;
    }

    try {
      setError(null);
      console.log("Form data being submitted:", formData);
      const response = await fetch("/api/reservationsCecil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpenModal(false);
        const newReservations = await response.json();
        setReservations((prev) => [...prev, newReservations]);
      } else {
        setError("Failed to submit reservation.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const sortedData = reservations.sort((a, b) => {
    const numA = parseInt(a.reservation_id.match(/\d+/)[0]);
    const numB = parseInt(b.reservation_id.match(/\d+/)[0]);
    return numB - numA;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Peminjaman Ruangan</h1>
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  Agnes [12345]
                  <Menu size={20} />
                </button>
                {showLogout && (
                  <button
                    className="absolute right-0 mt-2 w-full bg-white border shadow-lg py-2 px-4 rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ruangan, keperluan, pendamping, status"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setOpenModal(true)}
              >
                + Ajukan Peminjaman
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border p-2 text-left">No</th>
                      <th className="border p-2 text-left">Tanggal</th>
                      <th className="border p-2 text-left">Waktu</th>
                      <th className="border p-2 text-left">Ruangan</th>
                      <th className="border p-2 text-left">Keperluan</th>
                      <th className="border p-2 text-left">Pendamping</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => {
                      const startDate = new Date(item.start_time);
                      const formattedDate =
                        startDate.toLocaleDateString("id-ID");
                      const formattedTime = `${startDate
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${startDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`;

                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border p-2">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="border p-2">{formattedDate}</td>
                          <td className="border p-2">{formattedTime}</td>
                          <td className="border p-2">
                            {getRoomName(item.room_id)}
                          </td>
                          <td className="border p-2">{item.purpose}</td>
                          <td className="border p-2">-</td>
                          <td className="border p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                item.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="border p-2">
                            {item.status === "pending"
                              ? "menunggu disetujui oleh tim sarpras"
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                &gt;
              </button>
            </div>

            <div className="mt-6 text-center text-gray-500 text-sm">
              2020 © Sistem Fasilitas SMAK Santa Agnes
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-600">Error: {error}</p>}
      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Ajukan Peminjaman</DialogTitle>
        <DialogContent>
          <form className="grid gap-4 mt-2">
            <TextField
              label="Tanggal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.tanggal}
              onChange={handleFormChange("tanggal")}
            />
            <FormControl>
              <InputLabel>Waktu Mulai</InputLabel>
              <Select
                value={formData.waktuMulai}
                onChange={handleFormChange("waktuMulai")}
              >
                {startTimeOptions.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Waktu Selesai</InputLabel>
              <Select
                value={formData.waktuSelesai}
                onChange={handleFormChange("waktuSelesai")}
              >
                {endTimeOptions.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Ruangan</InputLabel>
              <Select
                value={formData.ruangan}
                onChange={handleFormChange("ruangan")}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.room_id} value={room.room_name}>
                    {room.room_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Keperluan"
              value={formData.keperluan}
              onChange={handleFormChange("keperluan")}
            />
            {/* Conditionally render the teacher dropdown */}
            {showTeacherDropdown && (
              <FormControl>
                <InputLabel>Guru Pendamping</InputLabel>
                <Select
                  value={formData.teacher}
                  onChange={handleFormChange("teacher")}
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.username} value={teacher.username}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomReservation;
