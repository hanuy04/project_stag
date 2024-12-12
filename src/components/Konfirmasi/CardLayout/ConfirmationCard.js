import {
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState, useEffect } from "react";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
const formatTime = (time) => {
  const t = new Date(time);
  const hours = ("0" + t.getHours()).slice(-2);
  const minutes = ("0" + t.getMinutes()).slice(-2);
  return `${hours}:${minutes}`;
};

export default function ConfirmationCard({ data }) {
  console.log(data); // Ensure the data includes no_absen and class_name

  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{data.room_name}</h3>
          <p className="text-gray-600 mb-4">
            {formatDate(data.start_time)} | {formatTime(data.start_time)} -{" "}
            {formatTime(data.end_time)}
          </p>
          <p className="text-gray-700 mb-6">{data.purpose}</p>
          <div className="flex items-center gap-4 mb-4">
            <Person />
            <span>{data.user_name}</span>
          </div>
          {/* Display no_absen and class_name */}
          <p className="text-gray-700 mb-4">
            <strong>No Absensi:</strong> {data.no_absen}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Kelas (Ruangan):</strong> {data.class_name}
          </p>
          <div className="flex gap-4">
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleOpenModal}
            >
              Tolak
            </Button>
            <Button
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#4338CA" }}
            >
              Konfirmasi
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <h2 id="modal-title" className="text-lg font-bold mb-4">
            Alasan Penolakan
          </h2>
          <div className="mb-4">
            <p>
              <strong>Ruangan:</strong> {data.room_name}
            </p>
            <p>
              <strong>Tanggal:</strong> {formatDate(data.start_time)}
            </p>
            <p>
              <strong>Waktu:</strong> {formatTime(data.start_time)} -{" "}
              {formatDate(data.end_time)}
            </p>
            <p>
              <strong>Keperluan:</strong> {data.purpose}
            </p>
            <p>
              <strong>Peminjam:</strong> {data.user_name}
            </p>
          </div>
          <p>
            <strong>Alasan:</strong>
          </p>
          <TextField
            id="modal-description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Tulis alasan penolakan di sini..."
            value={reason}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setReason(e.target.value);
              }
            }}
          />
          <span className="text-xs ml-72">{reason.length}/50</span>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handleCloseModal} variant="outlined">
              Batal
            </Button>
            <Button
              onClick={() => {
                console.log("Penolakan dikirim!");
                handleCloseModal();
              }}
              variant="contained"
              color="error"
              disabled={reason.length === 0 || reason.length > 50}
            >
              Kirim
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
