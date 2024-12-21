import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import JadwalPeminjaman from "../sarpras/peminjaman/JadwalPeminjaman";
import { formatTimeHHMM } from "@/utils/DateTime";
import Loading from "./Loading";
import JadwalLayanan from "../sarpras/peminjaman/JadwalLayanan";

const ClockDisplay = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const role = useSelector((state) => state.persist.auth.user?.role);
  const token = useSelector((state) => state.persist.auth.token);
  const [scheduleToday, setScheduleToday] = useState();
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchSchedule = async () => {
    try {
      const today = new Date();
      let dayOrder = today.getDay();
      dayOrder = dayOrder === 0 ? 7 : dayOrder;
      const response = await fetch(`/api/settings?id=${dayOrder}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch schedule");
      const data = await response.json();
      setScheduleToday(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [token]);

  const formattedTime =
    currentTime &&
    currentTime.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formattedDate =
    currentTime &&
    currentTime.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formattedDay =
    currentTime &&
    currentTime.toLocaleDateString("id-ID", {
      weekday: "long",
    });

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Box className="bg-blue p-4 rounded-xl shadow-md my-2">
          {currentTime && (
            <Box className="w-full flex">
              <Box className="">
                <Typography
                  variant="h3"
                  align="end"
                  style={{ fontWeight: "bold" }}
                  className="text-white"
                >
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

          <Button
            variant="outline"
            sx={{
              backgroundColor: "#ffffff",
              width: "100%",
              color: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0", // Warna saat hover
              },
              marginBottom: "10px",
            }}
            onClick={() => role == "sarpras" && setOpenSchedule(true)}
          >
            <Box>
              <Typography
                variant="body1"
                style={{ fontWeight: "bolder" }}
                className="text-gray-800 font-extrabold "
              >
                Peminjaman ruangan hari ini
              </Typography>
              <Typography variant="body2" className="text-gray-800">
                {scheduleToday?.active
                  ? `${formatTimeHHMM(
                      scheduleToday.reservation_start
                    )} - ${formatTimeHHMM(scheduleToday.reservation_end)}`
                  : "Tidak ada jadwal"}

                {scheduleToday?.active && scheduleToday?.accompanying_teacher
                  ? ` - ${formatTimeHHMM(
                      scheduleToday.conditional_time
                    )} (dengan pendamping)`
                  : ""}
              </Typography>
            </Box>
          </Button>
          {openSchedule && (
            <JadwalPeminjaman
              open={openSchedule}
              setOpen={setOpenSchedule}
              title="Jadwal Peminjaman Ruangan"
              fetchSchedule={fetchSchedule}
            />
          )}
          {/* Layanan */}
          <Button
            variant="outline"
            sx={{
              backgroundColor: "#ffffff",
              width: "100%",
              color: "black",
              "&:hover": {
                backgroundColor: "#f0f0f0", // Warna saat hover
              },
            }}
            onClick={() => role == "sarpras" && setOpenService(true)}
          >
            <Box>
              <Typography
                variant="body1"
                style={{ fontWeight: "bolder" }}
                className="text-gray-800 font-extrabold "
              >
                Layanan sarpras hari ini
              </Typography>
              <Typography variant="body2" className="text-gray-800">
                {scheduleToday?.booking
                  ? `${formatTimeHHMM(
                      scheduleToday.booking_start
                    )} - ${formatTimeHHMM(scheduleToday.booking_end)}`
                  : "Tidak ada jadwal"}
              </Typography>
            </Box>
          </Button>
          {openService && (
            <JadwalLayanan
              open={openService}
              setOpen={setOpenService}
              title="Jadwal Peminjaman Ruangan"
              fetchSchedule={fetchSchedule}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default ClockDisplay;
