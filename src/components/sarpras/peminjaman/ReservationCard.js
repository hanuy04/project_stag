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
import { formatFullDate } from "@/utils/DateTime";

const ReservationCard = ({ data, setRefreshData }) => {
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
      <Card
        style={{
          backgroundColor: "whitesmoke",
        }}
        sx={{ borderRadius: "16px", boxShadow: 2 }}
      >
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
                    <b>Waktu</b>
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
                    <TableCell width={"15%"}>
                      <Typography variant="body2">{item.users.name}</Typography>
                      <Typography variant="body2">
                        {item.users.rooms &&
                          " [" +
                            item.users.rooms.room_name +
                            (item.users.no_absen && "/" + item.users.no_absen) +
                            "]"}
                      </Typography>
                    </TableCell>
                    <TableCell width={"30%"}>
                      <Typography variant="body2">{item.tanggal} </Typography>
                      <Typography variant="body2">
                        {item.start_time} {" - "}
                        {item.end_time}
                      </Typography>
                    </TableCell>
                    <TableCell width={"auto"}>{item.purpose}</TableCell>
                    <TableCell width={"10%"}>
                      {item.reservation_teacher?.name || "-"}
                    </TableCell>
                    <TableCell width={"10%"}>
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
          reservationParam={{
            ...data.reservations[selectedIndex],
            rooms: {
              room_id: data.room_id,
              room_name: data.room_name,
            },
          }}
          setRefreshData={setRefreshData}
          type="pending"
        />
      )}
    </Box>
  );
};

export default ReservationCard;
