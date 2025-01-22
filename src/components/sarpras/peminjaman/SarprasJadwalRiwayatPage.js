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

const SarprasJadwalRiwayatPage = () => {
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
    { label: "Tanggal", sort: true },
    { label: "Mulai", sort: true },
    { label: "Selesai", sort: true },
    { label: "Kegiatan", sort: true },
    { label: "Ruangan", sort: true },
  ];

  const fetchReservations = async () => {
    const querySortColumn = {
      reservation_id: `&sortColumn=reservation_id`,
      Tanggal: `&sortColumn=date`,
      Mulai: `&sortColumn=start_time`,
      Selesai: `&sortColumn=end_time`,
      Ruangan: `&sortColumn=room_name`,
      Kegiatan: `&sortColumn=description`,
    };

    const querySortOrder = `&sortOrder=${sortAsc ? "asc" : "desc"}`;
    const queryKeyword = keyword != "" ? `&keyword=${keyword}` : "";

    try {
      const response = await fetch(
        `/api/sarpras/reservations?type=jadwal&start_date=${startDate}&end_date=${endDate}${queryKeyword}&limit=${limit}&offset=${offset}${querySortColumn[sortColumn] || ""
        }${querySortOrder}`,
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
            placeholder="Kegiatan, Ruangan "
            fullWidth
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
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
              <TableCell
                key={index}
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
                  {formatFullDate(item.start_time)}{" "}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {formatTimeHHMM(item.start_time)}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {formatTimeHHMM(item.end_time)}
                </TableCell>
                <TableCell style={bodyCellStyle}>{item.purpose}</TableCell>
                <TableCell style={bodyCellStyle}>
                  {item.rooms.room_name}
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

export default SarprasJadwalRiwayatPage;
