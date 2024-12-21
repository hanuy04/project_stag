import CardDialog from "@/components/general/CardDialog";
import {
  Box,
  Button,
  Typography,
  TextField,
  Switch,
  Grid2,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const JadwalLayanan = ({ open, setOpen, fetchSchedule }) => {
  const [jadwalPeminjaman, setJadwalPeminjaman] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/settings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJadwalPeminjaman(data);
      } else {
        alert(response.status);
      }
    };
    fetchData();
  }, [token]);

  const handleSwitchChange = (index) => {
    const updatedJadwal = jadwalPeminjaman.map((item, i) =>
      i === index ? { ...item, booking: !item.booking } : item
    );
    setJadwalPeminjaman(updatedJadwal);
  };

  const handleTimeChange = (index, field, value) => {
    if (field === "reservation_end") {
      if (jadwalPeminjaman[index].booking_start >= value) {
        alert("Jam akhir invalid");
        return;
      }
    }

    if (field === "reservation_start") {
      if (jadwalPeminjaman[index].booking_end <= value) {
        alert("Waktu mulai invalid");
        return;
      }
    }

    setJadwalPeminjaman((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async () => {
    console.log(jadwalPeminjaman);
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jadwalPeminjaman: jadwalPeminjaman,
      }),
    });

    if (response.ok) {
      alert("Perubahan berhasil disimpan");
      setOpen(false);
      fetchSchedule();
    } else {
      alert("Terjadi kesalahan saat menyimpan perubahan");
    }
  };

  return (
    <CardDialog
      title="Jadwal Layanan"
      open={open}
      setOpen={setOpen}
      maxWidth="sm"
    >
      {jadwalPeminjaman.map((item, index) => (
        <Grid2
          container
          spacing={2}
          alignItems="center"
          key={index}
          sx={{ mb: 2 }}
          justifyContent={"between"}
          borderBottom={"solid 1px lightgrey"}
          paddingBottom={2}
          alignContent={"center"}
          columns={12}
        >
          <Grid2 item size={4} container paddingRight={3}>
            <Grid2 item size={"grow"} alignContent={"center"}>
              <Typography fontWeight="bold">{item.day}</Typography>
            </Grid2>
            <Switch
              checked={item.booking}
              onChange={() => handleSwitchChange(index)}
            />
          </Grid2>

          {item.booking && (
            <>
              <Grid2
                item
                size={8}
                container
                spacing={1}
                paddingRight={4}
                justifyContent={"center"}
              >
                <Grid2 item size={"auto"}>
                  <TextField
                    type="time"
                    value={item.booking_start || "00:00:00"}
                    onChange={(e) =>
                      handleTimeChange(index, "booking_start", e.target.value)
                    }
                    size="small"
                    fullWidth
                    InputProps={{
                      sx: { textAlign: "center" },
                    }}
                  />
                </Grid2>
                <Grid2 item size={"auto"} alignContent={"center"}>
                  <Typography variant="body2" align="center">
                    s/d
                  </Typography>
                </Grid2>

                <Grid2 item size={"auto"} alignContent={"center"}>
                  <TextField
                    type="time"
                    value={item.booking_end || "00:00:00"}
                    size="small"
                    fullWidth
                    onChange={(e) =>
                      handleTimeChange(index, "booking_end", e.target.value)
                    }
                  />
                </Grid2>
              </Grid2>
            </>
          )}
        </Grid2>
      ))}

      <Box sx={{ textAlign: "center", pb: 2 }} width={"100%"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1a33d0",
            "&:hover": { backgroundColor: "#1429a3" },
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          Simpan Perubahan
        </Button>
      </Box>
    </CardDialog>
  );
};

export default JadwalLayanan;
