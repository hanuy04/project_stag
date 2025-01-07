import CardDialog from "@/components/general/CardDialog";
import {
  formatFullDate,
  formatFullDateToYYYYMMDD,
  formatTimeHHMM,
  formatYYYYMMDDToFullDate,
} from "@/utils/DateTime";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteOption from "../jadwal/DeleteOption";

const DetailRow = ({ label, value, input, marginYLabel = "auto" }) => (
  <Box sx={{ display: "flex", marginBottom: 2 }}>
    <Typography sx={{ width: "200px", marginY: marginYLabel, marginRight: 1 }}>
      {label}
    </Typography>
    {value && <Typography>: {value}</Typography>}
    {input}
  </Box>
);

const DetailPeminjaman = ({
  open,
  setOpen,
  reservationParam,
  setRefreshData,
  type,
}) => {
  const token = useSelector((state) => state.persist.auth.token);
  const [reservation, setReservation] = useState(reservationParam);
  const [tolak, setTolak] = useState(false);
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState();
  const [rooms, setRooms] = useState([]);
  const [newReservation, setNewReservation] = useState(reservation);
  const [allDay, setAllDay] = useState(
    newReservation.start_time == "00:00" && newReservation.end_time == "23:59"
  );
  const [openDelete, setOpenDelete] = useState(false);

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

  const handleTerima = async (reservation_id) => {
    const response = await fetch(
      `/api/sarpras/reservations/${reservation_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status_sarpras: "approved",
        }),
      }
    );

    if (response.ok) {
      setOpen(false);
      setRefreshData(true);
    }
    const data = await response.json();
    alert(data.message);
  };

  const handleTolak = async (reservation_id, description) => {
    if (description == "") {
      alert("Alasan harus diisi");
      return;
    }
    const response = await fetch(
      `/api/sarpras/reservations/${reservation_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status_sarpras: "rejected",
          description: description,
        }),
      }
    );

    if (response.ok) {
      setOpen(false);
      setRefreshData(true);
    }
    const data = await response.json();
    alert(data.message);
  };

  const handleEdit = async () => {
    if (newReservation.purpose.length < 3) {
      alert("Nama kegiatan minimal 3 karakter");
      return;
    }

    const reservationData = {
      room_id: newReservation.room_id,
      date: formatFullDateToYYYYMMDD(newReservation.tanggal),
      start_time: allDay ? "00:00" : newReservation.start_time,
      end_time: allDay ? "23:59" : newReservation.end_time,
      purpose: newReservation.purpose,
    };

    try {
      const response = await fetch(
        `/api/sarpras/reservations/${reservation.reservation_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Reservasi berhasil diubah");
        setRefreshData(true);
        setOpen(false);
      } else {
        alert(`Gagal membuat reservasi: ${data.message}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data");
    }
  };

  const getReservation = async (next_id) => {
    const response = await fetch(`/api/sarpras/reservations/${next_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setReservation(data.reservation);
      setNewReservation(data.reservation);
      setEditMode(false);
    } else {
      alert(`${response.status} : ${data.message}`);
    }
  };

  return (
    <CardDialog
      open={open}
      setOpen={setOpen}
      maxWidth={"sm"}
      title={
        reservation.users.role_id != 0 ? "Detail Peminjaman" : "Detail Kegiatan"
      }
    >
      {editMode ? (
        <>
          <DetailRow
            label="Ruangan"
            input={
              <Select
                required
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    room_id: e.target.value,
                  })
                }
                value={newReservation.room_id}
                size="small"
                fullWidth
              >
                {rooms.map((item) => (
                  <MenuItem
                    key={item.room_id}
                    value={item.room_id}
                    selected={newReservation.room_id == item.room_id}
                  >
                    {item.room_name}
                  </MenuItem>
                ))}
              </Select>
            }
          ></DetailRow>
          <DetailRow
            label="Hari/Tanggal"
            input={
              <Box width={"100%"}>
                <TextField
                  type="date"
                  value={formatFullDateToYYYYMMDD(newReservation.tanggal)}
                  onChange={(e) => {
                    setNewReservation({
                      ...newReservation,
                      tanggal: formatYYYYMMDDToFullDate(e.target.value),
                    });
                  }}
                  size="small"
                  fullWidth
                />
              </Box>
            }
          />
          <DetailRow
            label="Pukul"
            input={
              <>
                <Grid2 container width={"100%"} alignItems={"center"}>
                  <Grid2 size={"auto"}>
                    <TextField
                      type="time"
                      value={newReservation.start_time}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          start_time: e.target.value,
                        })
                      }
                      size="small"
                      disabled={allDay}
                    />
                  </Grid2>
                  <Grid2 size={"auto"}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        px: 1,
                        marginY: "auto",
                      }}
                    >
                      -
                    </Box>
                  </Grid2>

                  <Grid2 size={"auto"}>
                    <TextField
                      type="time"
                      value={newReservation.end_time}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          end_time: e.target.value,
                        })
                      }
                      disabled={allDay}
                      size="small"
                    />
                  </Grid2>

                  <Grid2 size={"auto"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={allDay}
                          onChange={(e) => setAllDay(e.target.checked)}
                        />
                      }
                      label="Sepanjang hari"
                      style={{ marginLeft: 1 }}
                    />
                  </Grid2>
                </Grid2>
              </>
            }
          />

          <DetailRow
            label={reservation.users.role_id === "0" ? "Kegiatan" : "Keperluan"}
            marginYLabel="5px"
            input={
              <TextField
                fullWidth
                placeholder="Tuliskan kegiatan"
                variant="outlined"
                helperText={`${newReservation.purpose.length}/70`}
                onChange={(e) =>
                  e.target.value.length <= 70 &&
                  setNewReservation({
                    ...newReservation,
                    purpose: e.target.value,
                  })
                }
                value={newReservation.purpose}
                color={newReservation.purpose.length >= 3 ? "success" : "error"}
                required
                size="small"
              />
            }
          />
        </>
      ) : (
        <>
          <DetailRow label="Ruangan" value={reservation.rooms.room_name} />
          <DetailRow label="Hari/Tanggal" value={reservation.tanggal} />
          <DetailRow
            label="Pukul"
            value={
              allDay
                ? "Sepanjang hari"
                : `${reservation.start_time} - ${reservation.end_time}`
            }
          />
          <DetailRow
            label={reservation.users.role_id === "0" ? "Kegiatan" : "Keperluan"}
            value={reservation.purpose}
          />
        </>
      )}

      {reservation.teacher_assistant && (
        <DetailRow
          label="Pendamping"
          value={reservation.reservation_teacher?.name}
        />
      )}

      {reservation.users.role_id != 0 && (
        <DetailRow
          label="Peminjam"
          value={`${reservation.users?.name} ${
            reservation.users.kelas
              ? "(" +
                (reservation.users.rooms?.room_name ?? "N/A") +
                "/Absen : " +
                (reservation.users?.no_absen ?? "N/A") +
                ")"
              : ""
          }`}
        />
      )}

      {type == "pending" && tolak && (
        <>
          <TextareaAutosize
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            maxRows={5}
            placeholder="Tuliskan alasan..."
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </>
      )}

      {/* Actions */}
      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
        }}
      >
        {reservation.users.role_id == 0 && (
          <>
            <Button
              size={"auto"}
              marginRight={"auto"}
              style={{ color: reservation.prev ? "black" : "lightgray" }}
              disabled={!reservation.prev}
              onClick={() => getReservation(reservation.prev)}
            >
              <ArrowBack />
            </Button>

            {!editMode && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#E91E63",
                  color: "white",
                  width: "100%",
                  "&:hover": {
                    bgcolor: "#C2185B",
                  },
                  marginX: 0,
                }}
                onClick={() => setOpenDelete(true)}
              >
                Batalkan
              </Button>
            )}

            {editMode && (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "gray",
                  color: "white",
                  width: "100%",
                  "&:hover": {
                    bgcolor: "lightgray",
                  },
                }}
                onClick={() => {
                  setEditMode(false);
                  setNewReservation(reservation);
                }}
              >
                Kembali
              </Button>
            )}

            <Button
              variant="contained"
              sx={{
                bgcolor: "#304FFE",
                color: "white",
                width: "100%",
                "&:hover": {
                  bgcolor: "#1A237E",
                },
              }}
              onClick={editMode ? () => handleEdit() : () => setEditMode(true)}
            >
              Edit
            </Button>

            <Button
              size={"auto"}
              marginRight={"auto"}
              style={{ color: reservation.next ? "black" : "lightgray" }}
              disabled={!reservation.next}
              onClick={() => getReservation(reservation.next)}
            >
              <ArrowForward />
            </Button>
          </>
        )}

        {tolak && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "gray",
              color: "white",
              width: "200px",
              "&:hover": {
                bgcolor: "lightgray",
              },
            }}
            onClick={() => setTolak(false)}
          >
            Kembali
          </Button>
        )}
        {type == "pending" && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E91E63",
              color: "white",
              width: "200px",
              "&:hover": {
                bgcolor: "#C2185B",
              },
            }}
            onClick={
              !tolak
                ? () => setTolak(true)
                : () => handleTolak(reservation.reservation_id, description)
            }
          >
            Tolak
          </Button>
        )}

        {type == "pending" && !tolak && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#304FFE",
              color: "white",
              width: "200px",
              "&:hover": {
                bgcolor: "#1A237E",
              },
            }}
            onClick={() => handleTerima(reservation.reservation_id)}
          >
            Terima
          </Button>
        )}
      </DialogActions>

      {openDelete && (
        <DeleteOption
          open={openDelete}
          setOpen={setOpenDelete}
          reservation_id={reservation.reservation_id}
          setRefreshData={setRefreshData}
          setDetailOpen={setOpen}
        />
      )}
    </CardDialog>
  );
};

export default DetailPeminjaman;
