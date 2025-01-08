import Loading from "@/components/general/Loading";
import LoadingPage from "@/components/general/LoadingPage";
import Topbar from "@/components/navigation/topbar";
import { formatDateYYYYMMDD } from "@/utils/DateTime";
import { Add } from "@mui/icons-material";
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  Grid2,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScheduleTable from "./ScheduleTable";
import TambahJadwal from "./TambahJadwal";

const SarprasJadwalPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);
  const limit = 6;
  const [offset, setOffset] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [open, setopen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/sarpras/rooms?groupby=category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCategories(data.categories);
          setCategory(data.categories[0]?.room_category);
          setRooms(data.categories[0]?.rooms.slice(0, limit));
        } else {
          alert(`${response.status} : ${data.message}`);
        }
      } catch (error) {
        alert("Terjadi kesalahan saat mengambil data");
      } finally {
        setRefreshData(false);
      }
    };

    fetchData();
  }, [token]);

  const changeCategory = (category) => {
    setCategory(category);
    setOffset(0);
    const categoryItem = categories.find(
      (item) => item.room_category === category
    );

    if (categoryItem) {
      const { rooms } = categoryItem;
      setRooms(rooms.slice(0, limit));
    } else {
      setRooms([]);
    }
  };

  const changeOffset = (offset) => {
    setOffset(offset);
    const categoryItem = categories.find(
      (item) => item.room_category === category
    );

    if (categoryItem) {
      const { rooms } = categoryItem;
      const start = limit * offset;
      const end = start + limit;
      setRooms(rooms.slice(start, end));
    } else {
      setRooms([]);
    }
  };

  const totalRooms =
    categories.find((item) => item.room_category === category)?.rooms.length ||
    0;
  const pageCount = Math.ceil(totalRooms / limit);

  const handlePageChange = (event, page) => {
    const newOffset = page - 1;
    changeOffset(newOffset);
  };

  return (
    <>
      <Topbar title={"Informasi Ketersediaan Ruangan"} />
      <Grid2 container justifyContent={"space-between"} paddingY={4}>
        <Grid2 display={"flex"} gap={2}>
          <Grid2 display={"flex"} gap={2} size="auto">
            <Typography marginY={"auto"} fontSize={20}>
              <b>Kategori</b>
            </Typography>

            <Select
              fullWidth
              value={category}
              onChange={(e) => changeCategory(e.target.value)}
              size="small"
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={item.room_category}>
                  {item.room_category}
                </MenuItem>
              ))}
            </Select>
          </Grid2>

          <Grid2 display={"flex"} gap={2} size="auto">
            <Typography marginY={"auto"} fontSize={20}>
              <b>Tanggal</b>
            </Typography>
            <TextField
              type="date"
              size="small"
              value={formatDateYYYYMMDD(selectedDate)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </Grid2>
        </Grid2>

        <Grid2 display={"flex"} gap={2} size={"auto"}>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              fontFamily: "unset",
              paddingLeft: 10,
              paddingRight: 10,
            }}
            startIcon={<Add />}
            onClick={() => setopen(true)}
          >
            Tambahkan jadwal
          </Button>
        </Grid2>
      </Grid2>

      <ScheduleTable
        rooms={rooms}
        token={token}
        selectedDate={selectedDate}
        setRefreshData={setRefreshData}
        open={open}
        setOpen={setopen}
      />

      {pageCount > 1 && (
        <Box marginY={3}>
          <Pagination
            count={pageCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            style={{
              justifyItems: "center",
            }}
          />
        </Box>
      )}

      {open && (
        <TambahJadwal
          open={open}
          setOpen={setopen}
          rooms={rooms}
          setRefreshData={setRefreshData}
        />
      )}
    </>
  );
};

export default SarprasJadwalPage;
