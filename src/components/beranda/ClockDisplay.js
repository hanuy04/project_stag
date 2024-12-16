import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const ClockDisplay = () => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime && currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = currentTime && currentTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDay = currentTime && currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
  });

  return (
    <Box className="bg-blue p-4 rounded-xl shadow-md my-2">
      {currentTime && (
        <Box className="w-full flex">
          <Box className="">
            <Typography variant="h3" align="end" style={{ fontWeight:"bold" }} className="text-white">
              {formattedTime}
            </Typography>
          </Box>

          <Box className="ms-auto ">
            <Typography variant="h6" className="text-white p-0 m-0">
              {formattedDate}
            </Typography>
            <Typography variant="h6" className="text-white">
              {formattedDay}
            </Typography>
          </Box>
        </Box>
      )}

      <Box className="bg-white rounded-lg p-4 mt-4">
        <Typography
          variant="body1"
          style={{ fontWeight: "bolder" }}
          className="text-gray-800 font-extrabold "
        >
          Peminjaman ruangan hari ini
        </Typography>
        <Typography variant="body1" className="text-gray-800">
          15:00 - 17:00
        </Typography>
      </Box>
    </Box>
  );
};

export default ClockDisplay;
