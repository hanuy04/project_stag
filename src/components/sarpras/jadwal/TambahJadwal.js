import CardDialog from "@/components/general/CardDialog";
import { formatDateYYYYMMDD, getDayAndWeek } from "@/utils/DateTime";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const formatDate = (fulldate = formatDateYYYYMMDD(new Date())) => {
  return {
    fulldate,
    ...getDayAndWeek(fulldate),
  };
};

const TambahJadwal = ({
  open,
  setOpen,
  setRefreshData,
  defaultStart,
  defaultRoom,
  defaultDate,
}) => {
  const token = useSelector((state) => state.persist.auth.token);
  const username = useSelector((state) => state.persist.auth.user.username);
  const [date, setDate] = useState(
    defaultDate ? () => formatDate(defaultDate) : formatDate
  );
  const [startTime, setStartTime] = useState(defaultStart || "09:00");
  const [endTime, setEndTime] = useState(
    defaultStart
      ? (parseInt(defaultStart.toString().split(":")) + 1)
          .toString()
          .padStart(2, "0") + ":00"
      : "12:00"
  );
  const [allDay, setAllDay] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [rooms, setRooms] = useState([]);
  const [repeat, setRepeat] = useState("none");
  const [room, setRoom] = useState(defaultRoom || null);
  const [selectedOption, setSelectedOption] = useState("on");
  const [selectedDate, setSelectedDate] = useState(date.fulldate);
  const [occurrences, setOccurrences] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sarpras/rooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setRooms(data.rooms);
        } else {
          alert(`${response.status} : ${data.message}`);
        }
      } catch (error) {
        alert("Terjadi kesalahan saat mengambil data");
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async () => {
    if (purpose.length < 3) {
      alert("Nama kegiatan minimal 3 karakter");
      return;
    }

    if (!room) {
      alert("Pilih ruangan terlebih dahulu");
      return;
    }

    const reservationData = {
      username,
      room_id: room,
      date: date.fulldate,
      start_time: allDay ? "00:00" : startTime,
      end_time: allDay ? "23:59" : endTime,
      purpose,
    };

    if (repeat !== "none") {
      reservationData.repeat = {
        type: repeat,
        endType: selectedOption,
        endValue: selectedOption === "on" ? selectedDate : occurrences,
      };
    }

    try {
      const response = await fetch(`/api/sarpras/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Reservasi berhasil dibuat");
        setRefreshData(true);
        setOpen(false);
      } else {
        alert(`Gagal membuat reservasi: ${data.message}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data");
    }
  };

  return (
    <CardDialog
      open={open}
      setOpen={setOpen}
      title="Tambah Jadwal"
      maxWidth="xs"
    >
      <Box sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Nama Kegiatan"
          placeholder="Tuliskan kegiatan"
          variant="outlined"
          helperText={`${purpose.length}/70`}
          onChange={(e) =>
            e.target.value.length <= 70 && setPurpose(e.target.value)
          }
          value={purpose}
          color={purpose.length >= 3 ? "success" : "error"}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Ruangan </InputLabel>
          <Select
            label="Ruangan"
            required
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          >
            {rooms.map((item) => (
              <MenuItem
                key={item.room_id}
                value={item.room_id}
                selected={defaultRoom == item.room_id}
              >
                {item.room_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography>Tanggal</Typography>
          <Grid2 container gap={2}>
            <Grid2 item xs>
              <TextField
                type="date"
                value={date.fulldate}
                onChange={(e) => {
                  if (e.target.value > selectedDate)
                    setSelectedDate(e.target.value);
                  setDate(formatDate(e.target.value));
                }}
                size="small"
                fullWidth
              />
            </Grid2>
            <Grid2 item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                  />
                }
                label="Sepanjang hari"
              />
            </Grid2>
          </Grid2>
        </Box>

        {!allDay && (
          <Box
            sx={{ display: "flex", gap: 1, mb: 2 }}
            justifyContent="space-between"
          >
            <TextField
              type="time"
              label="Waktu Mulai"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              size="small"
            />
            <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
              sampai
            </Box>
            <TextField
              type="time"
              label="Waktu Selesai"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Ulangi</InputLabel>
          <Select
            value={repeat}
            label="Ulangi"
            onChange={(e) => setRepeat(e.target.value)}
            size="small"
          >
            <MenuItem value="none">Tidak berulang</MenuItem>
            <MenuItem value="daily">Harian</MenuItem>
            <MenuItem value="weekly">Mingguan setiap hari {date?.day}</MenuItem>
            <MenuItem value="monthlyweek">
              Bulanan pada hari {date?.day} {date?.ordinalWeek}
            </MenuItem>
            <MenuItem value="monthly">
              Bulanan pada tanggal {date?.date}
            </MenuItem>
            <MenuItem value="weekday">
              Setiap hari kerja (Senin hingga Jumat)
            </MenuItem>
          </Select>
        </FormControl>

        {repeat !== "none" && (
          <>
            <Typography marginTop={2}>Berakhir</Typography>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <Grid2 container>
                <Grid2 item container alignItems="center" mb={1}>
                  <Grid2 item>
                    <Radio value="on" />
                  </Grid2>
                  <Grid2 item mr={1}>
                    <Typography>Pada</Typography>
                  </Grid2>
                  <Grid2 item>
                    <TextField
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      type="date"
                      size="small"
                    />
                  </Grid2>
                </Grid2>
                <Grid2 item container alignItems="center">
                  <Grid2 item>
                    <Radio value="after" />
                  </Grid2>
                  <Grid2 item mr={1}>
                    <Typography>Setelah</Typography>
                  </Grid2>
                  <Grid2 item>
                    <TextField
                      value={occurrences}
                      onChange={(e) => setOccurrences(e.target.value)}
                      type="number"
                      size="small"
                      style={{ width: "auto" }}
                    />
                  </Grid2>
                  <Grid2 item ml={2}>
                    <Typography>kali</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            </RadioGroup>
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 3,
            mb: 2,
            textTransform: "none",
            backgroundColor: "#0c21c1",
            "&:hover": {
              backgroundColor: "#0c41c1",
            },
          }}
        >
          Buat
        </Button>
      </Box>
    </CardDialog>
  );
};

export default TambahJadwal;
