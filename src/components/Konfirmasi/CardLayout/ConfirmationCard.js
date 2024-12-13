import {
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";

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
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSnackbarClose = (_, reason) => {
    if (reason !== "clickaway") {
      setSnackbarOpen(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/reservationsCecil?reservation_id=${data.reservation_id}&role_user=1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status_guru: "approved" }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData);
        setSnackbarMessage("Gagal mengonfirmasi peminjaman.");
      } else {
        setSnackbarMessage("Data berhasil dimasukkan!");
        setOpenModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
      setSnackbarMessage("Terjadi kesalahan saat mengonfirmasi pemesanan.");
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

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
            <span>
              {data.user_name} [{data.class_name}/{data.no_absen}]
            </span>
          </div>
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
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Mengonfirmasi..." : "Konfirmasi"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
              {formatTime(data.end_time)}
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
