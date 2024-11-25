import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Menu, X } from "@mui/icons-material";

const dummyData = [
  {
    no: 1,
    tanggal: "12/12/2024",
    waktu: "14:00 - 16:00",
    ruangan: "Ruang XII - 2",
    keperluan: "Kerja kelompok bahasa Inggris",
    pendamping: "-",
    status: "MENUNGGU PERSETUJUAN",
    keterangan: "Menunggu disetujui Tim Sarpras",
  },
  {
    no: 2,
    tanggal: "12/12/2024",
    waktu: "14:00 - 17:00",
    ruangan: "Lapangan Upacara",
    keperluan: "Latihan Upacara",
    pendamping: "Bernardus Totok, S.Psi.",
    status: "DISETUJUI",
    keterangan: "-",
  },
];

const rooms = [
  "Ruang XII-5",
  "Ruang XII-4",
  "Ruang XII-3",
  "Ruang XII-2",
  "Ruang XII-1",
  "Lapangan Upacara",
];

const RoomReservation = () => {
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
  const [formData, setFormData] = useState({
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    ruangan: "",
    keperluan: "",
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFormChange = (field) => (event) => {
    let value = event.target.value;

    // Add time validation logic
    if (field === "waktuMulai") {
      const time = value.split(":")[0];
      if (parseInt(time) < 7) value = "07:00";
      if (parseInt(time) > 19) value = "19:00";
    } else if (field === "waktuSelesai") {
      const time = value.split(":")[0];
      if (parseInt(time) < 7) value = "07:00";
      if (parseInt(time) > 21) value = "21:00";
    }

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setOpenModal(false);
  };

  return (
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
                {dummyData.map((item) => (
                  <tr key={item.no} className="hover:bg-gray-50">
                    <td className="border p-2">{item.no}</td>
                    <td className="border p-2">{item.tanggal}</td>
                    <td className="border p-2">{item.waktu}</td>
                    <td className="border p-2">{item.ruangan}</td>
                    <td className="border p-2">{item.keperluan}</td>
                    <td className="border p-2">{item.pendamping}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          item.status === "DISETUJUI"
                            ? "bg-green-100 text-green-800"
                            : item.status === "DITOLAK"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="border p-2">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
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

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          <span>Ajukan Peminjaman</span>
          <IconButton onClick={() => setOpenModal(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <TextField
              label="Tanggal"
              type="date"
              value={formData.tanggal}
              onChange={handleFormChange("tanggal")}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <div className="flex gap-4 items-center">
              <FormControl fullWidth>
                <InputLabel>Waktu Mulai</InputLabel>
                <Select
                  value={formData.waktuMulai}
                  onChange={handleFormChange("waktuMulai")}
                  label="Waktu Mulai"
                >
                  {startTimeOptions.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span>sampai</span>
              <FormControl fullWidth>
                <InputLabel>Waktu Selesai</InputLabel>
                <Select
                  value={formData.waktuSelesai}
                  onChange={handleFormChange("waktuSelesai")}
                  label="Waktu Selesai"
                >
                  {endTimeOptions.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <FormControl fullWidth>
              <InputLabel>Ruangan</InputLabel>
              <Select
                value={formData.ruangan}
                onChange={handleFormChange("ruangan")}
                label="Ruangan"
              >
                {rooms.map((room) => (
                  <MenuItem key={room} value={room}>
                    {room}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Keperluan"
              multiline
              rows={4}
              value={formData.keperluan}
              onChange={handleFormChange("keperluan")}
              fullWidth
              placeholder="Tuliskan keperluan"
              InputProps={{
                endAdornment: (
                  <span className="text-gray-400">
                    {formData.keperluan.length}/50
                  </span>
                ),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomReservation;
