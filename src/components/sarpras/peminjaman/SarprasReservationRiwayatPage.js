import {
  Box,
  Chip,
  Grid2,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SarprasReservationTemplate from "./SarprasReservationTemplate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatDateYYYYMMDD,
  formatFullDate,
  formatTimeHHMM,
} from "@/utils/DateTime";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const SarprasReservationRiwayatPage = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [reservations, setReservations] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [sortColumn, setSortColumn] = useState("reservation_id");
  const [sortAsc, setSortAsc] = useState(false);
  const [offset, setOffset] = useState(1);
  const limit = 20;
  const [actual, setActual] = useState();
  const [startDate, setStartDate] = useState(
    formatDateYYYYMMDD(firstDayOfMonth)
  );
  const [endDate, setEndDate] = useState(formatDateYYYYMMDD(lastDayOfMonth));

  const headerTable = [
    { label: "No", sort: false },
    { label: "Peminjam", sort: true },
    { label: "Tanggal", sort: true },
    { label: "Mulai", sort: true },
    { label: "Selesai", sort: true },
    { label: "Ruangan", sort: true },
    { label: "Keperluan", sort: true },
    { label: "Pendamping", sort: true },
    { label: "Status", sort: true },
    { label: "Keterangan", sort: true },
  ];

  const displayStatus = (reservation) => {
    const getLabel = () => {
      if (reservation.teacher_assistant) {
        if (reservation.status_guru === "pending")
          return ["MENUNGGU", "PENDAMPING"];
        if (reservation.status_guru === "rejected")
          return ["DITOLAK", "PENDAMPING"];
      }

      if (reservation.status_sarpras === "pending")
        return ["MENUNGGU", "SARPRAS"];
      if (reservation.status_sarpras === "approved") return ["DISETUJUI"];
      if (reservation.status_sarpras === "rejected") return ["DITOLAK"];

      return "STATUS TIDAK DIKETAHUI";
    };

    return (
      <Typography
        color={
          getLabel().includes("MENUNGGU")
            ? "warning"
            : getLabel().includes("DISETUJUI")
              ? "success"
              : "red"
        }
        variant="caption"
        lineHeight={0}
      >
        {getLabel().map((item) => item + "\n")}
      </Typography>
    );
  };

  const fetchReservations = async () => {
    const queryStatus = {
      "MENUNGGU PENDAMPING": "&status_guru=pending",
      "DITOLAK PENDAMPING": "&status_guru=rejected",
      "MENUNGGU SARPRAS": "&status_sarpras=pending&status_guru=approved",
      "DITOLAK SARPRAS": "&status_sarpras=rejected",
      DISETUJUI: "&status_sarpras=approved",
    };

    const querySortColumn = {
      reservation_id: `&sortColumn=reservation_id`,
      Peminjam: `&sortColumn=name`,
      Tanggal: `&sortColumn=date`,
      Mulai: `&sortColumn=start_time`,
      Selesai: `&sortColumn=end_time`,
      Ruangan: `&sortColumn=room_name`,
      Pendamping: `&sortColumn=reservation_teacher`,
      Status: `&sortColumn=status`,
      Keterangan: `&sortColumn=description`,
      Keperluan: `&sortColumn=purpose`,
    };

    const querySortOrder = `&sortOrder=${sortAsc ? "asc" : "desc"}`;
    const queryKeyword = keyword != "" ? `&keyword=${keyword}` : "";

    try {
      const response = await fetch(
        `/api/sarpras/reservations?type=peminjaman&start_date=${startDate}&end_date=${endDate}${queryKeyword}&limit=${limit}&offset=${offset}${queryStatus[status] || ""
        }${querySortColumn[sortColumn] || ""}${querySortOrder}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setReservations(data.reservations);
        setActual(data.actual); // Update total data

        // Periksa dan perbarui offset jika diperlukan
        const totalPages = Math.ceil(data.actual / limit);
        if (offset > totalPages) {
          setOffset(1); // Arahkan ke halaman terakhir yang valid
        }
      } else {
        console.error(`${response.status} : ${data.message}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data peminjaman", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token, status, sortColumn, sortAsc, keyword, offset, startDate, endDate]);

  const handlePageChange = (event, page) => {
    alert(page);
    setOffset(page);
  };

  const headerCellStyle = {
    color: "white",
    border: "1px solid white",
    maxWidth: "max-content",
  };
  const bodyCellStyle = {
    border: "1px solid #0c21c1",
    maxWidth: "max-content",
  };

  return (
    <SarprasReservationTemplate>
      <Grid2 container paddingY={2} gap={2}>
        <Grid2 size={"grow"}>
          <Typography variant="body2">Cari</Typography>
          <TextField
            size="small"
            placeholder="Ruangan, keperluan, nama pendamping, nama peminjam"
            fullWidth
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </Grid2>
        <Grid2 size={3}>
          <Typography variant="body2">Status</Typography>
          <Select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">Semua</MenuItem>
            <MenuItem value="MENUNGGU PENDAMPING">Menunggu pendamping</MenuItem>
            <MenuItem value="DITOLAK PENDAMPING">Ditolak pendamping</MenuItem>
            <MenuItem value="MENUNGGU SARPRAS">Menunggu sarpras</MenuItem>
            <MenuItem value="DITOLAK SARPRAS">Ditolak sarpras</MenuItem>
            <MenuItem value="DISETUJUI">Disetujui</MenuItem>
          </Select>
        </Grid2>
        <Grid2>
          <Typography variant="body2">Tanggal</Typography>
          <Box display={"flex"}>
            <TextField
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Typography marginY={"auto"} marginX={1}>
              s/d
            </Typography>

            <TextField
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>
        </Grid2>
      </Grid2>

      <Table size="small">
        <TableHead>
          <TableRow style={{ textAlign: "center" }}>
            {headerTable.map((item, index) => (
              <TableCell key={index}
                className="bg-blue"
                style={headerCellStyle}
                onClick={() => {
                  if (item.sort) {
                    sortColumn == item.label
                      ? setSortAsc(!sortAsc)
                      : setSortAsc(true);
                    setSortColumn(item.label);
                  }
                }}
              >
                <Box display={"flex"} justifyContent={"space-between"}>
                  {item.label}
                  {item.sort &&
                    sortColumn === item.label &&
                    (sortAsc ? <ArrowDropUp /> : <ArrowDropDown />)}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {reservations.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell style={bodyCellStyle}>{index + 1}</TableCell>
                <TableCell style={bodyCellStyle}>
                  <Typography variant="body2">{item.users.name}</Typography>

                  {item.users.rooms &&
                    " [" +
                    item.users.rooms.room_name +
                    (item.users.no_absen && "/" + item.users.no_absen) +
                    "]"}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {formatFullDate(item.start_time)}{" "}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {formatTimeHHMM(item.start_time)}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {formatTimeHHMM(item.end_time)}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {item.rooms.room_name}
                </TableCell>
                <TableCell style={bodyCellStyle}>{item.purpose}</TableCell>
                <TableCell style={bodyCellStyle}>
                  {item.reservation_teacher?.name}
                </TableCell>
                <TableCell style={{ ...bodyCellStyle, width: "10%" }}>
                  {displayStatus(item)}
                </TableCell>
                <TableCell style={{ ...bodyCellStyle, width: "15%" }}>
                  {item.description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box marginY={3}>
        <Pagination
          count={Math.ceil(actual / limit)}
          page={offset}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          style={{
            justifyItems: "center",
          }}
        />
      </Box>
    </SarprasReservationTemplate>
  );
};

export default SarprasReservationRiwayatPage;
