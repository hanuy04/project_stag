import AuthLayout from "../layouts/AuthLayout";

import {
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
import { useState } from "react";

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

  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirm = formData.get("confirm");
    const role = formData.get("role");

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
        }),
      });

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
      } else {
        router.push("/");
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
        {role == "student" && (
          <FormControl>
            <Grid2 container alignContent={"flex"} spacing={1}>
              <Typography marginY={"auto"}>Kelas</Typography>
              <Grid2>
                <Select size="small" defaultValue={"X"}>
                  <MenuItem defaultChecked value={"X"}>
                    X
                  </MenuItem>
                  <MenuItem value={"XI"}>XI</MenuItem>
                  <MenuItem value={"XII"}>XII</MenuItem>
                </Select>
              </Grid2>

              <Grid2>
                <Select defaultValue={"1"} size="small">
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"6"}>6</MenuItem>
                </Select>
              </Grid2>
            </Grid2>
          </FormControl>
        )}

        <StyledButton
          fullWidth
          variant="contained"
          type="submit"
          className="bg-blue hover:bg-blue-700 normal-case py-3"
        >
          Register
        </StyledButton>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun? Login <a href="/">disini</a>
        </p>

        <p className="text-center text-sm text-gray-600">
          Jika terjadi kesalahan, silahkan hubungi tim IT.
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
