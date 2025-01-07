import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const CardDialog = ({ title, open, setOpen, children, maxWidth }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      style={{ overflowY: "auto" }}
    >
      {/* Tombol Silang */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
        }}
      >
        <Close />
      </IconButton>

      <DialogTitle fontSize={"lg"} sx={{ fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CardDialog;
