// src/components/FacilityManagement.js

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
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Person2,
  Edit as EditIcon,
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
  // Existing States
  const [rooms, setRooms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCategory, setNewRoomCategory] = useState("");

  // State for Edit Room Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomCategory, setEditRoomCategory] = useState("");

  // Snackbar for Rooms
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // New States for Facilities
  const [facilities, setFacilities] = useState([]);
  const [isFacilitiesModalOpen, setIsFacilitiesModalOpen] = useState(false);
  const [newFacilityName, setNewFacilityName] = useState("");
  const [newFacilityCategory, setNewFacilityCategory] = useState("");

  // State for Edit Facility Modal
  const [isEditFacilityModalOpen, setIsEditFacilityModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [editFacilityName, setEditFacilityName] = useState("");
  const [editFacilityCategory, setEditFacilityCategory] = useState("");

  // Snackbar for Facilities
  const [facilitiesSnackbar, setFacilitiesSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch Rooms on Mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms"); // Gunakan endpoint yang benar
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned an invalid response.");
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch rooms");
        }

        setRooms(data.rooms || []); // Sesuaikan dengan struktur respon backend
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch rooms data",
          severity: "error",
        });
      }
    };

    fetchRooms();
  }, []);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      handleOpenFacilitiesModal();
      // Reset tabValue jika diperlukan
      setTabValue(0);
    }
  };

  // Handle Menu Open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Add Room Modal Open
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Handle Add Room Modal Close
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewRoomName("");
    setNewRoomCategory("");
  };

  // Handle Add Room
  const handleAddRoom = async () => {
    if (newRoomName.trim() && newRoomCategory) {
      const isLocked = newRoomCategory === "locked";
      try {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newRoomName.trim(), isLocked }),
        });

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned an invalid response.");
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to add room");
        }

        // Tambahkan ruangan baru ke state
        setRooms([data, ...rooms]); // Karena backend mengembalikan objek ruangan langsung

        handleCloseAddModal();
        setSnackbar({
          open: true,
          message: "Room added successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error adding room:", error);
        setSnackbar({
          open: true,
          message: error.message || "Failed to add room.",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Room name and category are required.",
        severity: "warning",
      });
    }
  };

  // Handle Edit Room Modal Open
  const handleOpenEditModal = (room) => {
    setSelectedRoom(room);
    setEditRoomName(room.room_name);
    setEditRoomCategory(room.room_status === "locked" ? "locked" : "unlocked");
    setIsEditModalOpen(true);
  };

  // Handle Edit Room Modal Close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRoom(null);
    setEditRoomName("");
    setEditRoomCategory("");
  };

  // Handle Edit Room
  const handleEditRoom = async () => {
    if (!editRoomName.trim()) {
      setSnackbar({
        open: true,
        message: "Room name cannot be empty.",
        severity: "warning",
      });
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${selectedRoom.room_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editRoomName.trim(),
          isLocked: editRoomCategory === "locked",
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to update room");
      }

      // Update the rooms state
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.room_id === data.room_id ? data : room))
      );

      handleCloseEditModal();
      setSnackbar({
        open: true,
        message: "Room updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating room:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to update room.",
        severity: "error",
      });
    }
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Facilities Modal Handlers
  const handleOpenFacilitiesModal = () => {
    setIsFacilitiesModalOpen(true);
    fetchFacilities();
  };

  const handleCloseFacilitiesModal = () => {
    setIsFacilitiesModalOpen(false);
    setFacilities([]);
    setNewFacilityName("");
    setNewFacilityCategory("");
  };

  // Fetch Facilities Data
  const fetchFacilities = async () => {
    try {
      const response = await fetch("/api/facilities"); // Pastikan endpoint benar
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch facilities");
      }

      setFacilities(data.data || []); // Sesuaikan dengan struktur respon backend
    } catch (error) {
      console.error("Error fetching facilities:", error);
      setFacilitiesSnackbar({
        open: true,
        message: "Failed to fetch facilities data",
        severity: "error",
      });
      // Tidak menutup modal agar pengguna bisa mencoba lagi atau melihat error
    }
  };

  // Handle Add Facility
  const handleAddFacility = async () => {
    if (newFacilityName.trim() && newFacilityCategory) {
      try {
        const response = await fetch("/api/facilities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newFacilityName.trim(),
            category: newFacilityCategory,
          }),
        });

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned an invalid response.");
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to add facility");
        }

        // Add new facility to state
        setFacilities([data.data, ...facilities]); // Karena backend mengembalikan objek fasilitas dalam data.data

        setNewFacilityName("");
        setNewFacilityCategory("");
        setFacilitiesSnackbar({
          open: true,
          message: "Facility added successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error adding facility:", error);
        setFacilitiesSnackbar({
          open: true,
          message: error.message || "Failed to add facility.",
          severity: "error",
        });
      }
    } else {
      setFacilitiesSnackbar({
        open: true,
        message: "Facility name and category are required.",
        severity: "warning",
      });
    }
  };

  // Handle Edit Facility Modal Open
  const handleOpenEditFacilityModal = (facility) => {
    setSelectedFacility(facility);
    setEditFacilityName(facility.name);
    setEditFacilityCategory(facility.category);
    setIsEditFacilityModalOpen(true);
  };

  // Handle Edit Facility Modal Close
  const handleCloseEditFacilityModal = () => {
    setIsEditFacilityModalOpen(false);
    setSelectedFacility(null);
    setEditFacilityName("");
    setEditFacilityCategory("");
  };

  // Handle Edit Facility
  const handleEditFacility = async () => {
    if (!editFacilityName.trim()) {
      setFacilitiesSnackbar({
        open: true,
        message: "Facility name cannot be empty.",
        severity: "warning",
      });
      return;
    }

    try {
      const response = await fetch(`/api/facilities/${selectedFacility.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editFacilityName.trim(),
          category: editFacilityCategory,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to update facility");
      }

      // Update the facilities state
      setFacilities((prevFacilities) =>
        prevFacilities.map((facility) =>
          facility.id === data.data.id ? data.data : facility
        )
      );

      handleCloseEditFacilityModal();
      setFacilitiesSnackbar({
        open: true,
        message: "Facility updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating facility:", error);
      setFacilitiesSnackbar({
        open: true,
        message: error.message || "Failed to update facility.",
        severity: "error",
      });
    }
  };

  // Handle Facilities Snackbar Close
  const handleFacilitiesSnackbarClose = () => {
    setFacilitiesSnackbar({ ...facilitiesSnackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {/* Header with Tabs and Menu */}
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
                  borderRadius: "0 8px 8px 0",
                  "&:hover": {
                    bgcolor: "#32408f",
                  },
                  flex: 1,
                  minWidth: "200px",
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

        {/* Main Content with Rooms List */}
        <div style={{ padding: "20px" }}>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {/* Add Room Button */}
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
                onClick={handleOpenAddModal}
              >
                <AddIcon sx={{ fontSize: 40, color: "#ccc" }} />
              </Card>
            </Grid>

            {/* Rooms List */}
            {Array.isArray(rooms) &&
              rooms.map((room) => (
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
                        onClick={() => handleOpenEditModal(room)}
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

        {/* Modal Dialog for Adding Room */}
        <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
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
            <Button onClick={handleCloseAddModal}>Batal</Button>
            <Button onClick={handleAddRoom} variant="contained">
              Tambah
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Dialog for Editing Room */}
        <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
          <DialogTitle>Detail & Edit Ruangan</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Ruangan"
              type="text"
              fullWidth
              variant="standard"
              value={editRoomName}
              onChange={(e) => setEditRoomName(e.target.value)}
              required
              error={!editRoomName.trim()}
              helperText={
                !editRoomName.trim() ? "Nama ruangan tidak boleh kosong" : ""
              }
            />
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel>Kategori</InputLabel>
              <Select
                value={editRoomCategory}
                onChange={(e) => setEditRoomCategory(e.target.value)}
                label="Kategori"
              >
                <MenuItem value="unlocked">Tidak Terkunci</MenuItem>
                <MenuItem value="locked">Terkunci</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal}>Batal</Button>
            <Button onClick={handleEditRoom} variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Facilities Modal Dialog */}
        <Dialog
          open={isFacilitiesModalOpen}
          onClose={handleCloseFacilitiesModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Daftar Fasilitas</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ marginBottom: 16 }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nama Fasilitas"
                  variant="standard"
                  fullWidth
                  value={newFacilityName}
                  onChange={(e) => setNewFacilityName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={newFacilityCategory}
                    onChange={(e) => setNewFacilityCategory(e.target.value)}
                    label="Kategori"
                  >
                    <MenuItem value="peralatan">Peralatan</MenuItem>
                    <MenuItem value="non-peralatan">Non-Peralatan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddFacility}
                  fullWidth
                >
                  Tambah
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {Array.isArray(facilities) && facilities.length > 0 ? (
                facilities.map((facility) => (
                  <Grid item xs={12} sm={6} key={facility.id}>
                    <Card
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div>
                        <Typography variant="h6">{facility.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {facility.category}
                        </Typography>
                      </div>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditFacilityModal(facility)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" align="center">
                    Tidak ada fasilitas yang tersedia.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFacilitiesModal}>Tutup</Button>
          </DialogActions>
        </Dialog>

        {/* Modal Dialog for Editing Facility */}
        <Dialog
          open={isEditFacilityModalOpen}
          onClose={handleCloseEditFacilityModal}
        >
          <DialogTitle>Edit Fasilitas</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Fasilitas"
              type="text"
              fullWidth
              variant="standard"
              value={editFacilityName}
              onChange={(e) => setEditFacilityName(e.target.value)}
              required
              error={!editFacilityName.trim()}
              helperText={
                !editFacilityName.trim()
                  ? "Nama fasilitas tidak boleh kosong"
                  : ""
              }
            />
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel>Kategori</InputLabel>
              <Select
                value={editFacilityCategory}
                onChange={(e) => setEditFacilityCategory(e.target.value)}
                label="Kategori"
              >
                <MenuItem value="peralatan">Peralatan</MenuItem>
                <MenuItem value="non-peralatan">Non-Peralatan</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditFacilityModal}>Batal</Button>
            <Button onClick={handleEditFacility} variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Rooms */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
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

        {/* Snackbar for Facilities */}
        <Snackbar
          open={facilitiesSnackbar.open}
          autoHideDuration={6000}
          onClose={handleFacilitiesSnackbarClose}
        >
          <Alert
            onClose={handleFacilitiesSnackbarClose}
            severity={facilitiesSnackbar.severity}
            sx={{ width: "100%" }}
          >
            {facilitiesSnackbar.message}

          </Alert>
        </Snackbar>
      </>
    </ThemeProvider>
  );
}
