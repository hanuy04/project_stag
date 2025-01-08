import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import Jadwal from "./Jadwal";
import TambahJadwal from "./TambahJadwal";
import { formatDateYYYYMMDD } from "@/utils/DateTime";

const ScheduleTable = ({ rooms, selectedDate, setRefreshData }) => {
  const [reservations, setReservations] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);

  const [open, setOpen] = useState(false);
  const [defaultStart, setDefaultStart] = useState(true);
  const [defaultRoom, setDefaultRoom] = useState();

  const [scheduleStart] = useState(6);
  const [scheduleEnd] = useState(18);

  const timeSlots = Array.from(
    { length: scheduleEnd - scheduleStart },
    (_, i) => {
      const hour = i + scheduleStart;
      return `${hour.toString().padStart(2, "0")}:00`;
    }
  );

  useEffect(() => {
    const fetchReservations = async () => {
      if (rooms.length === 0) return;

      const roomIds = rooms.map((room) => room.room_id);
      const date = selectedDate.toISOString().split("T")[0];

      try {
        const response = await fetch(
          `/api/sarpras/reservations?status_sarpras=approved&date=${date}&rooms=${roomIds.join(
            ","
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setReservations(data.reservations);
          setRefreshData(false);
        } else {
          console.error(`${response.status} : ${data.message}`);
        }
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil data peminjaman",
          error
        );
      }
    };

    fetchReservations();
  }, [rooms, selectedDate, token]);

  const isRoomBooked = (time, room) => {
    const startSchedule = `${scheduleStart.toString().padStart(2, "0")}:00`;

    return reservations.find((reservation) => {
      const startHour = new Date(reservation.start_time)
        .getUTCHours()
        .toString()
        .padStart(2, "0");

      return (
        reservation.room_id === room.room_id &&
        (time.startsWith(startHour) ||
          (time == startSchedule && startHour + ":00" < startSchedule))
      );
    });
  };

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow style={{ textAlign: "center" }}>
            <TableCell
              className="bg-blue"
              style={{
                color: "white",
                border: "1px solid white",
                maxWidth: "max-content", // Lebar kolom sesuai dengan konten
              }}
            >
              Waktu
            </TableCell>
            {rooms.map((item, i) => (
              <TableCell
                key={i}
                align="center"
                className="bg-blue "
                style={{
                  color: "white",
                  border: "1px solid white",
                  width: "auto", // Lebar kolom lainnya menyesuaikan
                }}
              >
                {item.room_name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {timeSlots.map((time, timeIndex) => (
            <TableRow key={timeIndex}>
              <TableCell
                style={{
                  border: "1px solid #0c21c1",
                  maxWidth: "max-content", // Lebar kolom sesuai dengan konten
                }}
              >
                {time}
              </TableCell>

              {rooms.map((roomItem, i) => {
                const booking = isRoomBooked(time, roomItem);

                return (
                  <TableCell
                    key={i}
                    style={{
                      padding: 0,
                      position: "relative",
                      height: "70px",
                      border: "1px solid #0c21c1",
                      overflow: "visible",
                    }}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      setDefaultRoom(roomItem.room_id);
                      setDefaultStart(time);
                      setOpen(true);
                    }}
                    title="Klik kanan untuk menambah jadwal"
                  >
                    {booking && (
                      <Jadwal
                        reservation={booking}
                        duration={scheduleEnd - scheduleStart}
                        setRefreshData={setRefreshData}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {open && (
        <TambahJadwal
          open={open}
          setOpen={setOpen}
          defaultStart={defaultStart}
          defaultRoom={defaultRoom}
          defaultDate={formatDateYYYYMMDD(selectedDate)}
          setRefreshData={setRefreshData}
        />
      )}
    </>
  );
};

export default ScheduleTable;
