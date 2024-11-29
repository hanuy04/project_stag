import React, { useState } from 'react';
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
} from '@mui/material';
import { ArrowDropDown, Add, Person } from '@mui/icons-material';

function ComplainPage() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Data contoh
  const complaints = [
    { id: 1, date: '12/12/2024 13:05', facility: 'AC', room: 'Ruang XII-6', complaint: 'AC nya tidak dingin', status: 'DIPROSES', description: 'AC sedang diperbaiki' },
    { id: 2, date: '12/12/2024 13:05', facility: 'Meja', room: 'Ruang XII-6', complaint: 'AC nya tidak dingin', status: 'DIPROSES', description: 'AC sedang diperbaiki' },
    { id: 3, date: '12/12/2024 13:05', facility: 'Papan tulis', room: 'Ruang XII-6', complaint: 'AC nya tidak dingin', status: 'DIPROSES', description: 'AC sedang diperbaiki' },
    { id: 4, date: '12/12/2024 13:05', facility: 'LCD', room: 'Ruang XII-6', complaint: 'AC nya tidak dingin', status: 'DIPROSES', description: 'AC sedang diperbaiki' },
    // ... data lainnya
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '24px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Typography 
          variant="h4" 
          style={{ 
            fontWeight: 'bold',
            color: '#000000',
            fontSize: '28px'
          }}
        >
          Pengaduan Fasilitas
        </Typography>
        
        <Button
          onClick={handleClick}
          style={{
            backgroundColor: '#3F51B5',
            color: 'white',
            borderRadius: '50px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
          }}
          startIcon={
            <Person style={{ fontSize: '20px' }} />
          }
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
              marginTop: '8px'
            }
          }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      {/* Search and Add Button */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <TextField
          variant="outlined"
          placeholder="Fasilitas, kelas, masalah"
          style={{ flexGrow: 1 }}
          InputProps={{
            style: { backgroundColor: 'white' }
          }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          style={{ backgroundColor: '#212121', color: 'white' }}
        >
          Ajukan Pengaduan
        </Button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#3F51B5' }}>
              <TableCell style={{ color: 'white' }}>No</TableCell>
              <TableCell style={{ color: 'white' }}>Tanggal Waktu</TableCell>
              <TableCell style={{ color: 'white' }}>Fasilitas</TableCell>
              <TableCell style={{ color: 'white' }}>Ruangan</TableCell>
              <TableCell style={{ color: 'white' }}>Keluhan</TableCell>
              <TableCell style={{ color: 'white' }}>Status</TableCell>
              <TableCell style={{ color: 'white' }}>Keterangan</TableCell>
              <TableCell style={{ color: 'white' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.date}</TableCell>
                <TableCell>{complaint.facility}</TableCell>
                <TableCell style={{ color: '#3F51B5' }}>{complaint.room}</TableCell>
                <TableCell style={{ color: '#3F51B5' }}>{complaint.complaint}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" style={{ color: '#3F51B5', borderColor: '#3F51B5' }} size="small">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button disabled>&lt;</Button>
        <Button variant="contained" style={{ backgroundColor: '#3F51B5', color: 'white' }}>1</Button>
        <Button>2</Button>
        <Button>&gt;</Button>
      </div>

      {/* Footer */}
      <Typography variant="body2" style={{ textAlign: 'center', marginTop: '32px', color: '#757575' }}>
        2020 © Sistem Fasilitas SMAK Santa Agnes
      </Typography>
    </div>
  );
}

export default ComplainPage;

