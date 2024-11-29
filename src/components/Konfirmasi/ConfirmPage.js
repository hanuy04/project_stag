import ConfirmationCard from "@/components/konfirmasi/CardLayout/ConfirmationCard";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Person,
} from "@mui/icons-material";

export default function ConfirmPage() {
  const confirmationData = [
    {
      id: 1,
      room: "Ruang XII - 5",
      date: "Mon, 14 Oct 2024",
      time: "16:00 - 18:00",
      description:
        "Rapat OSIS persiapan acara tahunan, pembagian tugas dan perencanaan anggaran",
      requester: "Agnes [XII-5/19]",
    },
    {
      id: 2,
      room: "Ruang XII - 5",
      date: "Mon, 14 Oct 2024",
      time: "16:00 - 18:00",
      description:
        "Rapat OSIS persiapan acara tahunan, pembagian tugas dan perencanaan anggaran",
      requester: "Agnes [XII-5/19]",
    },
  ];

  const historyData = [
    {
      no: 1,
      date: "12/12/2024",
      time: "14:00 - 16:00",
      room: "Ruang XII - 2",
      purpose: "Kerja kelompok bahasa Inggris",
      requester: "Agnes [XII-2/17]",
      status: "MENUNGGU PERSETUJUAN",
      notes: "Menunggu disetujui Tim Sarpras",
    },
    {
      no: 2,
      date: "12/12/2024",
      time: "14:00 - 17:00",
      room: "Lapangan Upacara",
      purpose: "Latihan Upacara",
      requester: "Umi Alisa [XII-2/20]",
      status: "DISETUJUI",
      notes: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Konfirmasi Pendampingan</h1>
        <Button
          variant="contained"
          style={{ backgroundColor: "#4338CA" }}
          endIcon={<KeyboardArrowRight />}
          startIcon={<Person />}
        >
          Agnes [12345]
        </Button>
      </div>

      {/* Waiting Confirmation Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Menunggu Konfirmasi</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {confirmationData.map((item) => (
            <ConfirmationCard key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* History Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Riwayat Pendampingan</h2>
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Tanggal</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Waktu</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Ruangan</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Keperluan</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Pemohon</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((row) => (
                <TableRow key={row.no}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.room}</TableCell>
                  <TableCell>{row.purpose}</TableCell>
                  <TableCell>{row.requester}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        row.status === "DISETUJUI"
                          ? "bg-green-100 text-green-800"
                          : row.status === "DITOLAK"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>{row.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button
            variant="outlined"
            size="small"
            startIcon={<KeyboardArrowLeft />}
          />
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#4338CA" }}
          >
            1
          </Button>
          <Button variant="outlined" size="small">
            2
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<KeyboardArrowRight />}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        2020 © Sistem Fasilitas SMAK Santa Agnes
      </footer>
    </div>
  );
}
