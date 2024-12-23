import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  DialogActions,
} from "@mui/material";
import DetailPeminjaman from "./DetailPeminjaman";



const ReservationCard = ({ data }) => {
  const [openDetail, setOpenDetail] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  return (
    <Box sx={{ position: "relative", pt: 3, mt: 2 }}>
      {/* Elevated Header */}
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: 0,
          left: "24px",
          backgroundColor: "#fdd835",
          padding: "8px 16px",
          borderRadius: "8px",
          display: "inline-block",
          color: "#000000",
          zIndex: 1,
        }}
      >
        {data.room_name}
      </Typography>

      {/* Main Card */}
      <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
        <CardContent>
          {/* Table Content */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Nama</b>
                  </TableCell>
                  <TableCell>
                    <b>Kelas</b>
                  </TableCell>
                  <TableCell>
                    <b>Pukul</b>
                  </TableCell>
                  <TableCell>
                    <b>Keperluan</b>
                  </TableCell>
                  <TableCell>
                    <b>Pendamping</b>
                  </TableCell>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reservations.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        item.users.kelas === item.room_id
                          ? "#e3f2fd"
                          : "inherit",
                    }}
                  >
                    <TableCell>{item.users.name}</TableCell>
                    <TableCell>{item.users.rooms?.room_name || "-"}</TableCell>
                    <TableCell>{item.start_time}</TableCell>
                    <TableCell>{item.purpose}</TableCell>
                    <TableCell>{item.pendamping}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#0c21c1",
                          color: "#ffffff",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#002984",
                          },
                        }}
                        onClick={() => {
                          setOpenDetail(true);
                          setSelectedIndex(index);
                        }}
                      >
                        Tinjau
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {openDetail && (
        <DetailPeminjaman
          open={openDetail}
          setOpen={setOpenDetail}
          data={data}
          selectedIndex={selectedIndex}
        />
      )}
    </Box>
  );
};

export default ReservationCard;
