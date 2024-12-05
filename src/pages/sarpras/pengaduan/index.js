import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { ArrowDropDown, Add, Person } from "@mui/icons-material";

const index = () => {
  const [searchPengaduan, setSearchPengaduan] = useState("");
  const [complains, setComplains] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10);
  const [detailForm, setDetailForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const response = await fetch(`/api/fetchComplains`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.complaints);

        if (!data || data.error) {
          console.error(
            "Error fetching complains:",
            data?.message || "Unknown error"
          );
          return;
        }

        setComplains(data.complaints);
      } catch (error) {
        console.error("Failed to fetch complain data:", error);
      }
    };

    fetchComplains();
  }, []);

  console.log(complains);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredComplaints = complains.filter(
    (complain) =>
      complain.fasilitas
        ?.toLowerCase()
        .includes(searchPengaduan.toLowerCase()) ||
      complain.ruangan?.toLowerCase().includes(searchPengaduan.toLowerCase()) ||
      complain.description.toLowerCase().includes(searchPengaduan.toLowerCase())
  );

  // logic utk pagination
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  // untuk handle ganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // format tanggal
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // pake format 24 jam
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  // update status complain
  const updateComplaintStatus = async () => {
    if (!selectedComplaint) {
      console.error("Invalid complaint or status selected");
      return;
    }

    try {
      const response = await fetch(`/api/updateComplainStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complain_id: selectedComplaint.complain_id,
          status: selectedStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update status:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);

      // Refresh state
      const updatedComplaints = complains.map((complain) =>
        complain.complain_id === selectedComplaint.complain_id
          ? { ...complain, status: selectedStatus }
          : complain
      );

      setComplains(updatedComplaints);
      setDetailForm(false);
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <MainLayout>
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

          <Button
            onClick={handleClick}
            style={{
              backgroundColor: "#3F51B5",
              color: "white",
              borderRadius: "50px",
              padding: "8px 16px",
              textTransform: "none",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
            startIcon={<Person style={{ fontSize: "20px" }} />}
            endIcon={<ArrowDropDown />}
          >
            Agnes [12345]
          </Button>
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
            style={{ backgroundColor: "#212121", color: "white" }}
          >
            Ajukan Pengaduan
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Complain ID</TableCell>
                <TableCell>Tanggal Waktu</TableCell>
                <TableCell>Fasilitas</TableCell>
                <TableCell>Ruangan</TableCell>
                <TableCell>Keluhan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Keterangan</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentComplaints.map((complaint, index) => (
                <TableRow key={complaint.complain_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{complaint.complain_id}</TableCell>
                  <TableCell>{formatDate(complaint.date)}</TableCell>
                  <TableCell>{complaint.fasilitas}</TableCell>
                  <TableCell>{complaint.ruangan}</TableCell>
                  <TableCell>{complaint.description}</TableCell>
                  <TableCell>{complaint.status}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{ color: "#3F51B5", borderColor: "#3F51B5" }}
                      size="small"
                      onClick={() => {
                        setDetailForm(true);
                        setSelectedComplaint(complaint);
                      }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "24px",
          }}
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

        {/* detail form saat ditekan detail */}
        {detailForm && selectedComplaint && (
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
                width: "500px",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h5" style={{ marginBottom: "16px" }}>
                Detail Pengaduan
              </Typography>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Complain ID:</Typography>
                <Typography>{selectedComplaint.complain_id}</Typography>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Fasilitas:</Typography>
                <Typography>{selectedComplaint.fasilitas}</Typography>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Ruangan:</Typography>
                <Typography>{selectedComplaint.ruangan}</Typography>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Keluhan:</Typography>
                <Typography>{selectedComplaint.description}</Typography>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Lampiran:</Typography>
                <Typography>
                  <img
                    src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-background-material-design-for-lorem-ipsum-logo-png-image_3624650.jpg"
                    className="w-20 h-20"
                  ></img>
                </Typography>
              </div>
              <hr />
              <h3 className="text-lg font-bold">Ubah Status Pengaduan</h3>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Status:</Typography>
                <select
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                  value={selectedComplaint.status}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="still_resolving">Diproses</option>
                  <option value="resolved">Telah Diperbaiki</option>
                  <option value="unresolved">Tidak bisa diperbaiki</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Typography variant="subtitle1">Deskripsi:</Typography>
                <TextField></TextField>
              </div>
              <div className="flex justify-between w-full">
                <Button
                  variant="outlined"
                  className="btn btn-primary w-1/2"
                  onClick={updateComplaintStatus}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="black"
                  onClick={() => setDetailForm(false)}
                >
                  X
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default index;
