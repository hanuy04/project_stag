import CardDialog from "@/components/general/CardDialog";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeleteOption = ({
  open,
  setOpen,
  reservation_id,
  setRefreshData,
  setDetailOpen,
}) => {
  const [deleteType, setDeleteType] = useState("only");
  const token = useSelector((state) => state.persist.auth.token);

  const handleDelete = async () => {
    const response = await fetch(
      `/api/sarpras/reservations/${reservation_id}?deleteType=${deleteType}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setRefreshData(true);
      setOpen(false);
      setDetailOpen(false);
    }
    const data = await response.json();
    alert(data.message);
  };

  return (
    <CardDialog
      open={open}
      setOpen={setOpen}
      maxWidth={"xs"}
      title="Batalkan Jadwal"
    >
      <Box>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={deleteType}
            onChange={(e) => setDeleteType(e.target.value)}
          >
            <FormControlLabel
              value="only"
              control={<Radio />}
              label="Hanya jadwal ini"
            />
            <FormControlLabel
              value="after"
              control={<Radio />}
              label="Jadwal ini dan selanjutnya"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Semua jadwal"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          style={{
            backgroundColor: "#E91E63",
            color: "white",
            "&:hover": {
              backgroundColor: "#C2185B",
            },
          }}
          onClick={handleDelete}
        >
          Batalkan
        </Button>
      </DialogActions>
    </CardDialog>
  );
};

export default DeleteOption;
