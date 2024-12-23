import CardDialog from "@/components/general/CardDialog";
import {
  Box,
  Button,
  DialogActions,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const DetailRow = ({ label, value }) => (
  <Box sx={{ display: "flex", marginBottom: 2 }}>
    <Typography sx={{ width: "200px" }}>{label}</Typography>
    <Typography sx={{ marginLeft: 1 }}>: {value}</Typography>
  </Box>
);

const DetailPeminjaman = ({ open, setOpen, data, selectedIndex }) => {
  const [tolak, setTolak] = useState(false);
  return (
    <CardDialog
      open={open}
      setOpen={setOpen}
      maxWidth={"sm"}
      title="Detail Peminjaman"
    >
      <DetailRow label="Ruangan yang dipinjam" value={data.room_name} />
      <DetailRow
        label="Hari/Tanggal"
        value={data.reservations[selectedIndex].tanggal}
      />
      <DetailRow
        label="Pukul"
        value={`${data.reservations[selectedIndex].start_time} - ${data.reservations[selectedIndex].end_time}`}
      />
      <DetailRow
        label="Keperluan"
        value={data.reservations[selectedIndex].purpose}
      />
      <DetailRow
        label="Pendamping"
        value={data.reservations[selectedIndex].teacher_assistant?.name}
      />

      {tolak && (
        <>
          <Typography>Alasan</Typography>
          <TextareaAutosize
            // value={value}
            // onChange={handleChange}

            minRows={3} // Minimal jumlah baris
            maxRows={5}
            placeholder="Type something..."
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

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          // onClick={onTolak}
          variant="contained"
          sx={{
            bgcolor: "#E91E63",
            color: "white",
            width: "200px",
            "&:hover": {
              bgcolor: "#C2185B",
            },
          }}
          onClick={() => setTolak(true)}
        >
          Tolak
        </Button>

        {!tolak && (
          <Button
            // onClick={onTerima}
            variant="contained"
            sx={{
              bgcolor: "#304FFE",
              color: "white",
              width: "200px",
              "&:hover": {
                bgcolor: "#1A237E",
              },
            }}
          >
            Terima
          </Button>
        )}
      </DialogActions>
    </CardDialog>
  );
};

export default DetailPeminjaman;
