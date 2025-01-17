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
  Typography,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LockOpen as LockOpenIcon } from "@mui/icons-material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Person2,
  Edit as EditIcon,
  Delete as DeleteIcon,
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
  // States untuk Ruangan (Rooms)
  const [rooms, setRooms] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCategory, setNewRoomCategory] = useState("");

  // States untuk Edit Ruangan
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomCategory, setEditRoomCategory] = useState("");

  // Snackbar untuk Ruangan
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // States untuk Fasilitas (Facilities)
  const [facilities, setFacilities] = useState([]);
  const [isFacilitiesModalOpen, setIsFacilitiesModalOpen] = useState(false);
  const [newFacilityName, setNewFacilityName] = useState("");
  const [newFacilityDescription, setNewFacilityDescription] = useState("");
  const [newFacilityQuantity, setNewFacilityQuantity] = useState(0);
  const [newFacilityRoomId, setNewFacilityRoomId] = useState("");

  // States untuk Edit Fasilitas
  const [isEditFacilityModalOpen, setIsEditFacilityModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [editFacilityName, setEditFacilityName] = useState("");
  const [editFacilityDescription, setEditFacilityDescription] = useState("");
  const [editFacilityQuantity, setEditFacilityQuantity] = useState(0);
  const [editFacilityRoomId, setEditFacilityRoomId] = useState("");

  // Snackbar untuk Fasilitas
  const [facilitiesSnackbar, setFacilitiesSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // State untuk Loading Fasilitas
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // For add/edit/delete operations

  // delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [isStatusChanging, setIsStatusChanging] = useState(false);

  // Fetch Rooms on Mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms"); // Ensure correct endpoint
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", text);
          throw new Error("Server returned an invalid response.");
        }

        console.log("Fetched Rooms Data:", data); // Debugging log

        setRooms(data.rooms || []); // Adjust based on backend response structure
        console.log("Rooms State Updated:", data.rooms || []); // Debugging log
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
      setIsProcessing(true);
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

        console.log("Added Room Data:", data); // Debugging log

        // Add the new room to state
        setRooms((prevRooms) => [data, ...prevRooms]);
        console.log("Rooms State Updated:", [data, ...rooms]); // Debugging log

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
      } finally {
        setIsProcessing(false);
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

    setIsProcessing(true);
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

      console.log("Updated Room Data:", data); // Debugging log

      // Update the rooms state
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.room_id === data.room_id ? data : room))
      );
      console.log("Rooms State Updated:", rooms); // Debugging log

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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleRoomStatus = async (room) => {
    setIsStatusChanging(true);
    try {
      const newIsLocked = room.room_status === "available";
      const response = await fetch(`/api/rooms/${room.room_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: room.room_name,
          isLocked: newIsLocked,
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
        throw new Error(data.error || "Failed to update room status");
      }

      // Update rooms state with the new status
      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r.room_id === room.room_id
            ? { ...r, room_status: data.room_status }
            : r
        )
      );

      setSnackbar({
        open: true,
        message: `Ruangan ${
          data.room_status === "locked" ? "dikunci" : "dibuka"
        }!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error toggling room status:", error);
      setSnackbar({
        open: true,
        message: error.message || "Gagal mengubah status ruangan.",
        severity: "error",
      });
    } finally {
      setIsStatusChanging(false);
    }
  };

  // Handle Delete Room
  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;

    setIsProcessing(true);
    try {
      // First check if room has facilities
      const facilitiesResponse = await fetch("/api/facilities");
      if (!facilitiesResponse.ok) {
        throw new Error("Failed to check facilities");
      }
      const facilitiesData = await facilitiesResponse.json();

      const roomFacilities = facilitiesData.data.filter(
        (facility) => facility.roomId === roomToDelete.room_id
      );

      if (roomFacilities.length > 0) {
        // Show warning about existing facilities
        const confirmed = window.confirm(
          `This room has ${roomFacilities.length} facilities. Deleting the room will also delete all associated facilities. Continue?`
        );
        if (!confirmed) {
          setIsProcessing(false);
          return;
        }
      }

      const response = await fetch(`/api/rooms/${roomToDelete.room_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed with status: ${response.status}`
        );
      }

      // Update both rooms and facilities states
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.room_id !== roomToDelete.room_id)
      );

      setFacilities((prevFacilities) =>
        prevFacilities.filter(
          (facility) => facility.roomId !== roomToDelete.room_id
        )
      );

      handleCloseDeleteDialog();
      handleCloseEditModal();

      setSnackbar({
        open: true,
        message: "Ruangan dan fasilitas terkait berhasil dihapus!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      setSnackbar({
        open: true,
        message: `Gagal menghapus ruangan: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  // Handle Delete Dialog Open
  const handleOpenDeleteDialog = (room) => {
    setRoomToDelete(room);
    setIsDeleteDialogOpen(true);
  };

  // Handle Delete Dialog Close
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setRoomToDelete(null);
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
    setNewFacilityDescription("");
    setNewFacilityQuantity(0);
    setNewFacilityRoomId("");
  };

  // Fetch Facilities Data
  const fetchFacilities = async () => {
    setIsLoadingFacilities(true);
    try {
      console.log("Starting facilities fetch...");
      const response = await fetch("/api/facilities");
      console.log("Response status:", response.status);

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("Response data:", data);
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response format");
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch facilities");
      }

      const fetchedFacilities = data.data;
      if (!Array.isArray(fetchedFacilities)) {
        console.error("Invalid facilities data:", fetchedFacilities);
        throw new Error("Invalid facilities data format");
      }

      console.log("Processed facilities data:", fetchedFacilities);
      setFacilities(fetchedFacilities);
    } catch (error) {
      console.error("Detailed fetch error:", error);
      setFacilitiesSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsLoadingFacilities(false);
    }
  };

  // Handle Add Facility
  const handleAddFacility = async () => {
    if (
      !newFacilityName.trim() ||
      !newFacilityDescription.trim() ||
      !newFacilityRoomId.trim()
    ) {
      setFacilitiesSnackbar({
        open: true,
        message: "All fields are required.",
        severity: "warning",
      });
      return;
    } else if (newFacilityQuantity <= 0) {
      setFacilitiesSnackbar({
        open: true,
        message: "Kuantitas harus > 0!",
        severity: "warning",
      });
      return;
    }

    setIsProcessing(true);
    try {
      console.log("Starting facility creation...");
      const response = await fetch("/api/facilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFacilityName.trim(),
          description: newFacilityDescription.trim(),
          quantity: Number(newFacilityQuantity),
          roomId: newFacilityRoomId.trim(),
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("Response data:", data);
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response format");
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to add facility");
      }

      const newFacility = data.data;
      setFacilities((prevFacilities) => [newFacility, ...prevFacilities]);

      // Reset form
      setNewFacilityName("");
      setNewFacilityDescription("");
      setNewFacilityQuantity(0);
      setNewFacilityRoomId("");

      setFacilitiesSnackbar({
        open: true,
        message: "Facility added successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Detailed add error:", error);
      setFacilitiesSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Edit Facility Modal Open
  const handleOpenEditFacilityModal = (facility) => {
    console.log("Opening Edit Facility Modal with:", facility); // Debugging log
    setSelectedFacility(facility);
    setEditFacilityName(facility.name);
    setEditFacilityDescription(facility.description);
    setEditFacilityQuantity(facility.quantity);
    setEditFacilityRoomId(facility.roomId);
    setIsEditFacilityModalOpen(true);
  };

  // Handle Edit Facility Modal Close
  const handleCloseEditFacilityModal = () => {
    setIsEditFacilityModalOpen(false);
    setSelectedFacility(null);
    setEditFacilityName("");
    setEditFacilityDescription("");
    setEditFacilityQuantity(0);
    setEditFacilityRoomId("");
  };

  // Handle Edit Facility
  const handleEditFacility = async () => {
    if (
      !editFacilityName.trim() ||
      !editFacilityDescription.trim() ||
      !editFacilityRoomId.trim()
    ) {
      setFacilitiesSnackbar({
        open: true,
        message: "Name, description, and room ID cannot be empty.",
        severity: "warning",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`/api/facilities/${selectedFacility.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editFacilityName.trim(),
          description: editFacilityDescription.trim(),
          quantity: Number(editFacilityQuantity),
          roomId: editFacilityRoomId.trim(),
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

      console.log("Updated Facility Data:", data); // Debugging log

      // Update the facilities state
      const updatedFacility = data.data || data.facility || data;
      setFacilities((prevFacilities) =>
        prevFacilities.map((facility) =>
          facility.id === updatedFacility.id ? updatedFacility : facility
        )
      );
      console.log("Facilities State Updated:", facilities); // Debugging log

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
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Delete Facility
  const handleDeleteFacility = async (facilityId) => {
    if (!window.confirm("Are you sure you want to delete this facility?")) {
      return;
    }

    setIsProcessing(true);
    try {
      console.log(`Deleting facility with ID: ${facilityId}`);
      const response = await fetch(`/api/facilities/${facilityId}`, {
        method: "DELETE",
      });

      // Periksa apakah respons memiliki format JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete facility");
      }

      console.log("Delete result:", result);

      // Perbarui state fasilitas
      setFacilities((prevFacilities) =>
        prevFacilities.filter((facility) => facility.id !== facilityId)
      );

      setFacilitiesSnackbar({
        open: true,
        message: result.message || "Facility deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Delete facility error:", error);
      setFacilitiesSnackbar({
        open: true,
        message: error.message || "Failed to delete facility",
        severity: "error",
      });
    } finally {
      setIsProcessing(false);
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
                  color: "white",
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    bgcolor: "#32408f",
                    color: "white",
                  },
                  "&.Mui-selected": {
                    color: "white",
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
                  color: "white",
                  borderRadius: "0 8px 8px 0",
                  "&:hover": {
                    bgcolor: "#32408f",
                    color: "white",
                  },
                  "&.Mui-selected": {
                    color: "white",
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
            <MenuItem key="profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem key="settings" onClick={handleMenuClose}>
              Settings
            </MenuItem>
            <MenuItem key="logout" onClick={handleMenuClose}>
              Logout
            </MenuItem>
          </Menu>
        </div>

        {/* Main Content with Rooms or Facilities List */}
        <div style={{ padding: "20px" }}>
          {tabValue === 0 && (
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
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={room.room_id || room.id || `room-${room.room_name}`}
                  >
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
                          startIcon={
                            room.room_status === "locked" ? (
                              <LockIcon />
                            ) : (
                              <LockOpenIcon />
                            )
                          }
                          onClick={() => handleToggleRoomStatus(room)}
                          disabled={isStatusChanging}
                          sx={{
                            backgroundColor:
                              room.room_status === "locked"
                                ? "#f44336"
                                : "#4caf50",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor:
                                room.room_status === "locked"
                                  ? "#d32f2f"
                                  : "#388e3c",
                            },
                            textTransform: "none",
                            borderRadius: "4px",
                            padding: "6px 16px",
                          }}
                        >
                          {isStatusChanging ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : room.room_status === "locked" ? (
                            "Buka"
                          ) : (
                            "Kunci"
                          )}
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
          )}

          {tabValue === 1 && (
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {/* Add Facility Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenFacilitiesModal}
                  sx={{
                    bgcolor: "#3f51b5",
                    "&:hover": {
                      bgcolor: "#32408f",
                    },
                  }}
                >
                  Tambah Fasilitas
                </Button>
              </Grid>

              {/* Facilities List */}
              {isLoadingFacilities ? (
                <Grid container justifyContent="center">
                  <CircularProgress />
                </Grid>
              ) : Array.isArray(facilities) && facilities.length > 0 ? (
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
                          Description: {facility.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Quantity: {facility.quantity}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Room ID: {facility.roomId}
                        </Typography>
                      </div>
                      <div>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEditFacilityModal(facility)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteFacility(facility.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
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
          )}

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
              required
            />
            <TextField
              margin="dense"
              label="Kategori"
              type="text"
              fullWidth
              variant="standard"
              select
              SelectProps={{
                native: true,
              }}
              value={newRoomCategory}
              onChange={(e) => setNewRoomCategory(e.target.value)}
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="unlocked">Tidak Terkunci</option>
              <option value="locked">Terkunci</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal} disabled={isProcessing}>
              Batal
            </Button>
            <Button
              onClick={handleAddRoom}
              variant="contained"
              disabled={isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : "Tambah"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Dialog for Editing Room */}
        <Dialog
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          maxWidth="sm"
          fullWidth
        >
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
            <TextField
              margin="dense"
              label="Kategori"
              type="text"
              fullWidth
              variant="standard"
              select
              SelectProps={{
                native: true,
              }}
              value={editRoomCategory}
              onChange={(e) => setEditRoomCategory(e.target.value)}
              required
            >
              <option value="unlocked">Tidak Terkunci</option>
              <option value="locked">Terkunci</option>
            </TextField>
          </DialogContent>
          <DialogActions
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => handleOpenDeleteDialog(selectedRoom)}
              color="error"
              variant="contained"
              startIcon={<DeleteIcon />}
              disabled={isProcessing}
            >
              Hapus
            </Button>
            <div>
              <Button
                onClick={handleCloseEditModal}
                disabled={isProcessing}
                sx={{ mr: 1 }}
              >
                Batal
              </Button>
              <Button
                onClick={handleEditRoom}
                variant="contained"
                disabled={isProcessing}
              >
                {isProcessing ? <CircularProgress size={24} /> : "Simpan"}
              </Button>
            </div>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Konfirmasi Hapus Ruangan</DialogTitle>
          <DialogContent>
            <Typography>
              Apakah Anda yakin ingin menghapus ruangan "
              {roomToDelete?.room_name}"? Tindakan ini tidak dapat dibatalkan.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} disabled={isProcessing}>
              Batal
            </Button>
            <Button
              onClick={handleDeleteRoom}
              color="error"
              variant="contained"
              disabled={isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : "Hapus"}
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
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nama Fasilitas"
                  variant="standard"
                  fullWidth
                  value={newFacilityName}
                  onChange={(e) => setNewFacilityName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Deskripsi"
                  variant="standard"
                  fullWidth
                  value={newFacilityDescription}
                  onChange={(e) => setNewFacilityDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Kuantitas"
                  type="number"
                  variant="standard"
                  fullWidth
                  value={newFacilityQuantity}
                  onChange={(e) => setNewFacilityQuantity(e.target.value)}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Room ID"
                  variant="standard"
                  fullWidth
                  value={newFacilityRoomId}
                  onChange={(e) => setNewFacilityRoomId(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddFacility}
                  fullWidth
                  disabled={isProcessing}
                >
                  {isProcessing ? <CircularProgress size={24} /> : "Tambah"}
                </Button>
              </Grid>
            </Grid>

            {/* Facilities List */}
            {Array.isArray(facilities) && facilities.length > 0 ? (
              facilities.map((facility) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={facility.id} // Ensure 'id' is unique
                >
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
                        Description: {facility.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {facility.quantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Room ID: {facility.roomId}
                      </Typography>
                    </div>
                    <div>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditFacilityModal(facility)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteFacility(facility.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseFacilitiesModal}
              disabled={isProcessing}
            >
              Tutup
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Dialog for Editing Facility */}
        <Dialog
          open={isEditFacilityModalOpen}
          onClose={handleCloseEditFacilityModal}
        >
          <DialogTitle>Edit Fasilitas</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Deskripsi"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editFacilityDescription}
                  onChange={(e) => setEditFacilityDescription(e.target.value)}
                  required
                  error={!editFacilityDescription.trim()}
                  helperText={
                    !editFacilityDescription.trim()
                      ? "Deskripsi tidak boleh kosong"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Kuantitas"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={editFacilityQuantity}
                  onChange={(e) => setEditFacilityQuantity(e.target.value)}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  label="Room ID"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={editFacilityRoomId}
                  onChange={(e) => setEditFacilityRoomId(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseEditFacilityModal}
              disabled={isProcessing}
            >
              Batal
            </Button>
            <Button
              onClick={handleEditFacility}
              variant="contained"
              disabled={isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : "Simpan"}
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
