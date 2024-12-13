import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { KeyboardArrowRight, Person } from "@mui/icons-material";
import { useState, useEffect } from "react";
import ConfirmationCard from "./CardLayout/ConfirmationCard";

export default function ConfirmPage() {
  const [showLogout, setShowLogout] = useState(false);
  const [confirmationData, setConfirmationData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/reservationsCecil");
        const data = await response.json();

        const roomsResponse = await fetch("/api/roomsCecil");
        const rooms = await roomsResponse.json();

        const usersResponse = await fetch("/api/usersCecil");
        const users = await usersResponse.json();

        const roomLookup = rooms.reduce((acc, room) => {
          acc[room.room_id] = room.room_name;
          return acc;
        }, {});

        const userLookup = users.reduce((acc, user) => {
          acc[user.username] = user.name;
          return acc;
        }, {});
        const absenLookup = users.reduce((acc, user) => {
          acc[user.username] = user.no_absen;
          return acc;
        }, {});
        const kelasLookup = users.reduce((acc, user) => {
          acc[user.username] = user.kelas;
          return acc;
        }, {});

        const waitingConfirmation = data.filter(
          (item) =>
            item.teacher_assistant === "GR003" && item.status_guru === "pending"
        );
        const history = data.filter(
          (item) =>
            item.teacher_assistant === "GR003" &&
            (item.status_guru === "rejected" || item.status_guru === "approved")
        );

        const mappedWaitingConfirmation = waitingConfirmation.map((item) => {
          const room_id = kelasLookup[item.username];
          const class_name = roomLookup[room_id];

          return {
            ...item,
            room_name: roomLookup[item.room_id],
            user_name: userLookup[item.username],
            class_name: class_name,
            no_absen: absenLookup[item.username],
          };
        });

        const mappedHistory = history.map((item) => ({
          ...item,
          room_name: roomLookup[item.room_id],
          user_name: userLookup[item.username],
        }));

        setRoomsData(rooms);
        setUsersData(users);
        setConfirmationData(mappedWaitingConfirmation);
        setHistoryData(mappedHistory);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const sortedData = historyData.sort((a, b) => {
    const numA = parseInt(a.reservation_id.match(/\d+/)[0]);
    const numB = parseInt(b.reservation_id.match(/\d+/)[0]);
    return numB - numA;
  });
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Konfirmasi Pendampingan</h1>
            <div className="relative">
              <Button
                variant="contained"
                style={{ backgroundColor: "#4338CA" }}
                endIcon={<KeyboardArrowRight />}
                startIcon={<Person />}
                onClick={() => setShowLogout(!showLogout)}
              >
                Agnes [12345]
              </Button>
              {showLogout && (
                <button
                  className="absolute right-0 mt-10 w-full bg-white border shadow-lg py-2 px-4 rounded-lg text-red-600 hover:bg-red-50"
                  onClick={() => console.log("Logout clicked")}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Waiting Confirmation Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Menunggu Konfirmasi</h2>
            {confirmationData.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {confirmationData.map((item) => (
                  <ConfirmationCard key={item.reservation_id} data={item} />
                ))}
              </div>
            ) : (
              <p className="text-black-500">Tidak ada permohonan peminjaman</p>
            )}
          </div>

          {/* History Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Riwayat Pendampingan</h2>
            <TableContainer component={Paper} className="shadow-md">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Tanggal
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Waktu</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Ruangan
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Keperluan
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Pemohon
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Keterangan
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row, index) => {
                    const startDate = new Date(row.start_time);
                    const endDate = new Date(row.end_time);
                    const formattedDate = startDate.toLocaleDateString("id-ID");
                    const formattedTimeStart = `${startDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${startDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;
                    const formattedTimeEnd = `${endDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${endDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;

                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell>
                          {formattedTimeStart} - {formattedTimeEnd}
                        </TableCell>
                        <TableCell>{row.room_name}</TableCell>
                        <TableCell>{row.purpose}</TableCell>
                        <TableCell>{row.user_name}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${(() => {
                              if (row.status_guru === "pending") {
                                return "bg-yellow-100 text-yellow-800";
                              } else if (row.status_guru === "rejected") {
                                return "bg-red-100 text-red-800";
                              } else if (row.status_guru === "approved") {
                                return "bg-green-100 text-green-800";
                              }
                            })()}`}
                          >
                            {(() => {
                              if (row.status_guru === "pending") {
                                return "Pending";
                              } else if (row.status_guru === "rejected") {
                                return "Rejected";
                              } else if (row.status_guru === "approved") {
                                return "Approved";
                              }
                            })()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {row.status_guru === "rejected"
                            ? row.description
                            : "Peminjaman Disetujui"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
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
                        ? "bg-[#4338CA] text-white"
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
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-gray-500">
            2020 © Sistem Fasilitas SMAK Santa Agnes
          </footer>
        </div>
      </div>
    </div>
  );
}
