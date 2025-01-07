import { formatFullDate, formatTimeHHMM } from "@/utils/DateTime";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DetailPeminjaman from "../peminjaman/DetailPeminjaman";
import { useSelector } from "react-redux";

const Jadwal = ({ reservation, duration, setRefreshData }) => {
  // Hitung durasi reservasi dalam menit
  const startTime = new Date(reservation.start_time);
  const endTime = new Date(reservation.end_time);

  const durationMinutes = (endTime - startTime) / (1000 * 60); // Durasi dalam menit

  // Hitung proporsi durasi terhadap 1 jam (60 menit)
  const durationHour = durationMinutes / 60;
  const durationRatio = durationHour < duration ? durationHour : duration;
  // const role = useSelector((state) => state.persist.auth.user.role);

  const top = (startTime.getMinutes() / 60) * 100 + "%";

  const [open, setOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Box
        className={`p-1 rounded-e ${
          isHovered
            ? reservation.users.role_id == 0
              ? "bg-red-300"
              : "bg-yellow-300"
            : reservation.users.role_id == 0
            ? "bg-red-400"
            : "bg-yellow-500"
        } rounded-e-lg`}
        style={{
          borderWidth: "1px 1px 1px 5px", // Atur ketebalan border (atas, kanan, bawah, kiri)
          borderStyle: "solid",
          borderColor: "#0c21c1",
          height: `${durationRatio * 100 + Math.floor(durationRatio)}%`, // Tinggi berdasarkan durasi
          width: "100%",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "absolute",
          top: top,
          textOverflow: "ellipsis", // Tambahkan ellipsis jika teks terlalu panjang
          whiteSpace: "nowrap", // Hindari teks wrapping
          transition: "background-color 0.3s ease",
          zIndex: 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(true)}
      >
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", color: "inherit" }}
        >
          {reservation.users.role_id != 0
            ? reservation.users.name
            : reservation.purpose}
        </Typography>
        <Typography variant="body2" style={{ color: "inherit" }}>
          {reservation.users.rooms && `(${reservation.users.rooms.room_name})`}
        </Typography>
        <Typography variant="body2" style={{ color: "inherit" }}>
          {formatTimeHHMM(reservation.start_time) == "00:00" &&
          formatTimeHHMM(reservation.end_time) == "23:59"
            ? "Sepanjang hari"
            : `${formatTimeHHMM(reservation.start_time)} -
              ${formatTimeHHMM(reservation.end_time)}`}
        </Typography>
      </Box>
      {open && (
        <DetailPeminjaman
          reservationParam={{
            ...reservation,
            tanggal: formatFullDate(reservation.start_time),
            start_time: formatTimeHHMM(reservation.start_time),
            end_time: formatTimeHHMM(reservation.end_time),
          }}
          open={open}
          setOpen={setOpen}
          setRefreshData={setRefreshData}
        />
      )}
    </>
  );
};

export default Jadwal;
