import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";
import { formatFullDate, formatTimeHHMM } from "@/utils/DateTime";

const PeminjamanCard = ({
  reservation
}) => {
  return (
    <Card className="my-4 p-2 border border-black">
      <CardContent>
        <Box className="flex justify-between items-start">
          <Box>
            <Typography variant="h6" className="font-medium">
              {reservation.rooms.room_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${formatFullDate(reservation.start_time)} | ${formatTimeHHMM(reservation.start_time)} - ${formatTimeHHMM(reservation.end_time)}`}
            </Typography>
          </Box>
          <Box
            className={`w-5 h-5 rounded-full ${reservation.status_sarpras === "pending"
              ? "bg-yellow-400"
              : reservation.status_sarpras === "rejected"
                ? "bg-red-500"
                : "bg-blue-500"
              }`}
          />
        </Box>

        <Typography variant="body2" className="py-3">
          {reservation.purpose}
        </Typography>

        {reservation.reservation_teacher && (
          <Box className="flex items-center mt-2">
            <Typography variant="body2" color="text.secondary">
              Pendamping: {reservation.reservation_teacher.name}
            </Typography>
          </Box>
        )}

        {(
          <Typography variant="body2" color="text.secondary" className="mt-1">
            file terlampir
          </Typography>
        )}

        <Box className="mt-2 p-2 bg-gray-50 rounded">
          <Typography variant="body2" color="text.secondary">
            {reservation.status_sarpras === "pending"
              ? "MENUNGGU PERSETUJUAN"
              : reservation.status_sarpras === "rejected"
                ? "DITOLAK"
                : "DIPROSES"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reservation.status_sarpras === "pending"
              ? "Menunggu persetujuan"
              : reservation.status_sarpras === "rejected"
                ? "Kelas bertabrakan dengan jadwal lain"
                : "Sudah disetujui"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PeminjamanCard;
