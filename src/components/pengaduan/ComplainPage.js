import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Select,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ArrowDropDown, Add, Person, Image } from "@mui/icons-material";
import Profile from "../general/Profile";

function ComplainPage() {
  const [searchPengaduan, setSearchPengaduan] = useState("");
  const [complains, setComplains] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10);
  const [detailForm, setDetailForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [complaint, setComplaint] = useState("");
  const [description, setDescription] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsResponse, facilitiesResponse] = await Promise.all([
          fetch("/api/rooms"),
          fetch("/api/fasilitas"),
        ]);

        const roomsData = await roomsResponse.json();
        const facilitiesData = await facilitiesResponse.json();

        // console.log(roomsData.rooms);
        // console.log(facilitiesData.facilities);

        setRooms(roomsData?.rooms || []);
        setFacilities(facilitiesData?.facilities || []);
      } catch (error) {
        console.error("Error fetching rooms or facilities:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    if (selectedRoom == "") {
      alert("Ruangan harus dipilih!");
      return;
    }

    if (selectedFacility == "") {
      alert("Fasilitas harus dipilih!");
      return;
    }

    if (complaint == "") {
      alert("Keluhan harus diisi!");
      return;
    }

    if (description == "") {
      alert("Deskripsi harus diisi!");
      return;
    }

    if (!selectedFile) {
      alert("Lampiran harus diisi!");
      return;
    }

    setOpenConfirmationModal(true);
  };

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const response = await fetch(`/api/fetchComplains`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!data || data.error) {
          console.error(
            "Error fetching complains:",
            data?.message || "Unknown error"
          );
          return;
        }

        // console.log(data.complaints);
        setComplains(data.complaints);
      } catch (error) {
        console.error("Failed to fetch complain data:", error);
      }
    };

    fetchComplains();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...complains].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setComplains(sortedData);
  };

  const filteredComplaints =
    complains?.filter(
      (complain) =>
        complain?.fasilitas
          ?.toLowerCase()
          .includes(searchPengaduan.toLowerCase()) ||
        complain?.ruangan
          ?.toLowerCase()
          .includes(searchPengaduan.toLowerCase()) ||
        complain?.description
          ?.toLowerCase()
          .includes(searchPengaduan.toLowerCase())
    ) || [];

  // console.log(filteredComplaints);

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = Array.isArray(filteredComplaints)
    ? filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleConfirmClick = async () => {
    if (!isChecked) {
      alert("Anda harus mencentang kotak persetujuan untuk melanjutkan!");
    } else {
      try {
        const formData = new FormData();
        formData.append("ruangan", selectedRoom);
        formData.append("fasilitas", selectedFacility);
        formData.append("keluhan", complaint);
        formData.append("deskripsi", description);
        formData.append("photo", selectedFile);

        const response = await fetch("/api/addComplain", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Server error: ${response.status} - ${errorText}`);
          throw new Error(errorText || "Gagal mengajukan pengaduan");
        }

        const newComplaint = await response.json();
        setComplains((prev) => [...prev, newComplaint]);

        setSelectedRoom("");
        setSelectedFacility("");
        setComplaint("");
        setDescription("");
        setSelectedFile(null);

        setOpenModal(false);
        setOpenConfirmationModal(false);
        alert("Pengaduan berhasil diajukan!");
      } catch (error) {
        console.error("Error submitting complaint:", error.message);
        alert("Terjadi kesalahan saat mengajukan pengaduan: " + error.message);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            color: "#000000",
            fontSize: "28px",
          }}
        >
          Pengaduan Fasilitas
        </Typography>

        <Profile />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              marginTop: "8px",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <TextField
          variant="outlined"
          placeholder="Fasilitas, kelas, masalah"
          style={{ flexGrow: 1 }}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
          onChange={(e) => setSearchPengaduan(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          style={{ backgroundColor: "#212121", color: "white", zIndex: 1100 }}
          onClick={() => {
            // console.log(rooms); // Log the rooms to the console when the button is clicked
            setOpenModal(true); // Proceed with opening the modal
          }}
        >
          Ajukan Pengaduan
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell onClick={() => handleSort("date")}>
                Tanggal, Waktu
              </TableCell>
              <TableCell onClick={() => handleSort("fasilitas")}>
                Fasilitas
              </TableCell>
              <TableCell onClick={() => handleSort("ruangan")}>
                Ruangan
              </TableCell>
              <TableCell onClick={() => handleSort("complaint")}>
                Keluhan
              </TableCell>
              <TableCell onClick={() => handleSort("description")}>
                Deskripsi
              </TableCell>
              <TableCell onClick={() => handleSort("status")}>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentComplaints && currentComplaints.length > 0 ? (
              currentComplaints.map((complaint, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{formatDate(complaint.date)}</TableCell>
                  <TableCell>{complaint.fasilitas}</TableCell>
                  <TableCell>{complaint.ruangan}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.description}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{ color: "#3F51B5", borderColor: "#3F51B5" }}
                      size="small"
                      onClick={() => {
                        setDetailForm(true);
                        setSelectedStatus(complaint.status);
                        setSelectedComplaint(complaint);
                      }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Tidak ada pengaduan untuk ditampilkan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}
      >
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage * complaintsPerPage >= filteredComplaints.length
          }
        >
          Next
        </Button>
      </div>

      {/* detail form */}
      {detailForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              width: "800px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "row",
              gap: "16px",
            }}
          >
            <div style={{ flex: 2 }}>
              <Typography
                variant="h4"
                style={{ marginBottom: "16px", fontWeight: "bold" }}
              >
                Detail Pengaduan
              </Typography>
              {selectedComplaint && (
                <div>
                  <Typography>
                    <strong>Fasilitas:</strong> {selectedComplaint.fasilitas}
                    {" ("}
                    {selectedComplaint.ruangan}
                    {")"}
                  </Typography>
                  <Typography>
                    <strong>Keluhan:</strong> {selectedComplaint.complaint}
                  </Typography>
                  <Typography>
                    <strong>Deskripsi:</strong> {selectedComplaint.description}
                  </Typography>
                  <div style={{ marginBottom: "16px" }}>
                    <Typography variant="subtitle1">
                      <strong>Lampiran:</strong>
                    </Typography>
                    <Typography>
                      {selectedComplaint.lampiran ? (
                        <img
                          src={selectedComplaint.lampiran}
                          alt="Lampiran"
                          style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <Typography>Tidak ada lampiran</Typography>
                      )}
                    </Typography>
                  </div>
                  <Typography>
                    <strong>Status:</strong> {selectedComplaint.status}
                  </Typography>
                </div>
              )}
              <Button
                variant="contained"
                style={{ marginTop: "16px" }}
                onClick={() => setDetailForm(false)}
              >
                Tutup
              </Button>
            </div>

            {selectedComplaint.status === "unresolved" && (
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  - Laporan Terkirim
                </Typography>
              </div>
            )}
            {selectedComplaint.status === "still_resolving" && (
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  - Laporan Terkirim
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "orange",
                  }}
                >
                  - Fasilitas sedang diperbaiki
                </Typography>
              </div>
            )}
            {selectedComplaint.status === "resolved" && (
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  - Laporan Terkirim
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "orange",
                  }}
                >
                  - Fasilitas sedang diperbaiki
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "16px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  - Fasilitas telah diperbaiki
                </Typography>
              </div>
            )}
          </div>
        </div>
      )}

      {openModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "16px" }}>
              Ajukan Pengaduan
            </Typography>
            <form className="grid gap-4 mt-2">
              <Select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.room_id} value={room.room_id}>
                    {room.room_name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
              >
                {facilities
                  .filter((facility) => facility.room_id === selectedRoom)
                  .map((facility) => (
                    <MenuItem
                      key={facility.facility_id}
                      value={facility.facility_id}
                    >
                      {facility.facility_name}
                    </MenuItem>
                  ))}
              </Select>

              <TextField
                label="Keluhan"
                placeholder="Tuliskan keluhan"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              />
              <TextField
                label="Deskripsi"
                placeholder="Ceritakan detail keluhan"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<Image />}
                  >
                    Upload File
                  </Button>
                </label>
                <Typography variant="body2">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </Typography>
              </Box>

              <Button variant="contained" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </form>
            <Button onClick={() => setOpenModal(false)}>Batal</Button>
          </div>
        </div>
      )}

      {openConfirmationModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "16px" }}>
              Konfirmasi Pengaduan
            </Typography>
            <Typography variant="body2">
              Apakah anda yakin ingin mengajukan pengaduan atas keluhan di{" "}
              {selectedRoom} fasilitas {selectedFacility}?
            </Typography>
            <form
              className="grid gap-4 mt-2"
              style={{ display: "flex", gap: "10px", width: "100%" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Saya setuju"
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleConfirmClick}
                style={{ flex: 1 }}
              >
                Konfirmasi
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenConfirmationModal(false)}
                color="error"
                style={{ flex: 1 }}
              >
                Batal
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplainPage;
