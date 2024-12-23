import AuthLayout from "../layouts/AuthLayout";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";

import { useDispatch } from "react-redux";
import { login } from "@/store/persistSlices/authSlice";
import { useRouter } from "next/router";
import { Check, Class, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#E5E7EB",
    },
  },
}));

const RegisterPage = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [role, setRole] = useState("student");
  const [kelas, setKelas] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms?is_class=true", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch rooms.");
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.rooms) {
          setRooms(data.rooms);
        } else {
          console.error("Rooms property missing in data");
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    fetchRooms();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    const role = formData.get("role");
    const kelas = formData.get("kelas");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          confirm,
          role,
          kelas,
        }),
      });

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Register failed: ${error.message}`);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Register</h2>

      <form className="space-y-6" onSubmit={handleRegister}>
        <Grid2 container>
          <Grid2 size={6}>
            <StyledTextField
              fullWidth
              placeholder="Nama Lengkap"
              variant="outlined"
              size="medium"
              name="name"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Edit className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 size={6} paddingLeft={2}>
            <StyledTextField
              fullWidth
              placeholder="Username/Nomor Induk"
              variant="outlined"
              size="medium"
              name="username"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container>
          <Grid2 size={6}>
            <StyledTextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              size="medium"
              name="password"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 size={6} paddingLeft={2}>
            <StyledTextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              size="medium"
              name="confirm"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Check className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
        </Grid2>

        <FormControl onChange={(e) => setRole(e.target.value)}>
          <FormLabel>Daftar sebagai</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={role}
            name="role"
            row
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Siswa"
            />

            <FormControlLabel
              value="teacher"
              control={<Radio />}
              label="Guru"
            />

            <FormControlLabel
              value="osis"
              control={<Radio />}
              label="Pengurus OSIS"
            />
          </RadioGroup>
        </FormControl>
        <Box>
          {role == "student" && (
            <FormControl>
              <Grid2 container alignContent={"flex"} spacing={1}>
                <Typography marginY={"auto"}>Kelas</Typography>
                <Grid2>
                  <Select
                    size="small"
                    name="kelas"
                    value={
                      kelas ? kelas : rooms.length > 0 ? rooms[0].room_id : ""
                    }
                    onChange={(e) => setKelas(e.target.value)}
                  >
                    {rooms.map((item) => {
                      return (
                        <MenuItem value={item.room_id}>
                          {item.room_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid2>
                <Grid2>
                  <StyledTextField
                    fullWidth
                    placeholder="No absen"
                    type="number"
                    size="small"
                    name="no_absen"
                    required
                    onInput={(e) => {
                      if (e.target.value < 1) {
                        e.target.value = 1;
                      }
                    }}
                  />
                </Grid2>
              </Grid2>
            </FormControl>
          )}
        </Box>

        <StyledButton
          fullWidth
          variant="contained"
          type="submit"
          className="bg-blue hover:bg-blue-700 normal-case py-3"
        >
          Register
        </StyledButton>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun? Login
          <a className="text-blue" href="/">
            <u>disini</u>
          </a>
        </p>

        <p className="text-center text-sm text-gray-600">
          Jika terjadi kesalahan, silahkan hubungi tim IT.
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
