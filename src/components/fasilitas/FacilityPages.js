// components/FacilityManagement.js

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Person2,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

export default function FacilityManagement() {
  const [rooms, setRooms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCategory, setNewRoomCategory] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Mengambil data rooms saat komponen di-mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Gagal mengambil data rooms",
          severity: "error",
        });
      }
    };

    fetchRooms();
  }, []);

  // Menangani perubahan tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Menangani pembukaan menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Menangani penutupan menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menangani pembukaan modal tambah room
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Menangani penutupan modal tambah room
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewRoomName("");
    setNewRoomCategory("");
  };

  // Menangani penambahan room baru
  const handleAddRoom = async () => {
    if (newRoomName && newRoomCategory) {
      const isLocked = newRoomCategory === "locked";
      try {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newRoomName, isLocked }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add room");
        }

        const addedRoom = await response.json();
        setRooms([addedRoom, ...rooms]); // Menambahkan room baru di awal daftar
        handleCloseModal();
        setSnackbar({
          open: true,
          message: "Room berhasil ditambahkan!",
          severity: "success",
        });
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: error.message || "Gagal menambah room.",
          severity: "error",
        });
      }
    }
  };

  // Menangani penutupan snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {/* Header dengan Tabs dan Menu */}
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col rounded-lg">
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab
                variant="contained"
                sx={{
                  bgcolor: "#3f51b5",
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    bgcolor: "#32408f",
                  },
                  flex: 1,
                  minWidth: "200px",
                  marginX: "10px",
                }}
                label="Daftar Kelas"
              />
              <Tab
                variant="contained"
                sx={{
                  bgcolor: "#3f51b5",
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    bgcolor: "#32408f",
                  },
                  flex: 1,
                  minWidth: "200px",
                  textDecorationColor: "white",
                }}
                label="Daftar Fasilitas"
              />
            </Tabs>
          </div>

          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuOpen}
            sx={{
              bgcolor: "#3f51b5",
              borderRadius: "50px",
              px: 3,
              "&:hover": {
                bgcolor: "#32408f",
              },
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person2 /> Tim Sarpras
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>

        {/* Konten Utama dengan Daftar Rooms */}
        <div style={{ padding: "20px" }}>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {/* Tombol Tambah Room */}
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card
                sx={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed #ccc",
                  cursor: "pointer",
                }}
                onClick={handleOpenModal}
              >
                <AddIcon sx={{ fontSize: 40, color: "#ccc" }} />
              </Card>
            </Grid>

            {/* Daftar Rooms */}
            {rooms.map((room) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={room.room_id}>
                <Card
                  sx={{
                    height: "auto",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardHeader
                    title={room.room_name}
                    titleTypographyProps={{
                      align: "center",
                      variant: "h6",
                      sx: {
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#333",
                      },
                    }}
                    sx={{
                      backgroundColor: "transparent",
                      padding: "1rem 1rem 0.5rem",
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      padding: "0.5rem 1rem 1rem",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<LockIcon />}
                      sx={{
                        backgroundColor: "#ffc107",
                        color: "#000",
                        "&:hover": { backgroundColor: "#ffb300" },
                        textTransform: "none",
                        borderRadius: "4px",
                        padding: "6px 16px",
                      }}
                    >
                      Buka
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      sx={{
                        backgroundColor: "#ffc107",
                        color: "#000",
                        "&:hover": { backgroundColor: "#ffb300" },
                        textTransform: "none",
                        borderRadius: "4px",
                        padding: "6px 16px",
                      }}
                    >
                      Lihat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px", color: "gray" }}
          >
            2024 © Sistem Fasilitas SMAK Santa Agnes
          </Typography>
        </div>

        {/* Modal Dialog untuk Menambah Room */}
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Tambah Ruangan Baru</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Ruangan"
              type="text"
              fullWidth
              variant="standard"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel>Kategori</InputLabel>
              <Select
                value={newRoomCategory}
                onChange={(e) => setNewRoomCategory(e.target.value)}
                label="Kategori"
              >
                <MenuItem value="unlocked">Tidak Terkunci</MenuItem>
                <MenuItem value="locked">Terkunci</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Batal</Button>
            <Button onClick={handleAddRoom} variant="contained">
              Tambah
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar untuk Notifikasi */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={600}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    </ThemeProvider>
  );
}
