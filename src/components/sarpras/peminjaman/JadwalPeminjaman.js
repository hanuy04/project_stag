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

const JadwalPeminjaman = ({ open, setOpen, fetchSchedule }) => {
  const [jadwalPeminjaman, setJadwalPeminjaman] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/setting/reserve", {
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
      i === index ? { ...item, active: !item.active } : item
    );
    setJadwalPeminjaman(updatedJadwal);
  };

  const handleTimeChange = (index, field, value) => {
    setJadwalPeminjaman((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async () => {
    console.log(jadwalPeminjaman);
    const response = await fetch("/api/setting/reserve", {
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
      title="Jadwal Peminjaman"
      open={open}
      setOpen={setOpen}
      maxWidth="md"
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
        >
          <Grid2 item size={2} container paddingRight={3}>
            <Grid2 item size={"grow"} alignContent={"center"}>
              <Typography fontWeight="bold">{item.day}</Typography>
            </Grid2>
            <Switch
              checked={item.active}
              onChange={() => handleSwitchChange(index)}
            />
          </Grid2>

          {item.active && (
            <>
              <Grid2
                item
                size={5}
                container
                spacing={1}
                paddingRight={4}
                justifyContent={"center"}
              >
                <Grid2 item size={"auto"}>
                  <TextField
                    type="time"
                    value={item.reservation_start || "00:00:00"}
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "reservation_start",
                        e.target.value
                      )
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
                    value={item.conditional_time || "00:00:00"}
                    size="small"
                    fullWidth
                    onChange={(e) =>
                      handleTimeChange(
                        index,
                        "conditional_time",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
              </Grid2>

              <Grid2 item size={5} container justifyContent={"end"}>
                <Grid2 item size={"auto"} alignContent={"center"}>
                  <Typography variant="body2" align="end" paddingRight={3}>
                    Dengan guru pendamping
                  </Typography>
                </Grid2>

                <Grid2 item size={"auto"}>
                  <TextField
                    type="time"
                    value={item.reservation_end || "00:00:00"}
                    size="small"
                    fullWidth
                    onChange={(e) =>
                      handleTimeChange(index, "reservation_end", e.target.value)
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

export default JadwalPeminjaman;
