import React from "react";
import AuthLayout from "../layouts/AuthLayout";

import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";

import { useDispatch } from "react-redux";
import { login } from "@/store/persistSlices/authSlice";
import { useRouter } from "next/router";
import { Check, Edit } from "@mui/icons-material";

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


  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Register</h2>
      <div className="h1">Daftar sebagai</div>

      {/* <Container>
        <Button variant="outlined" className="bg-blue">
          Guru
        </Button>
        <Button variant="outlined">Siswa</Button>
        <Button variant="outlined">Pengurus OSIS</Button>
      </Container> */}

      <form className="space-y-6">
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
          name="password"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Check className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Daftar sebagai
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="student"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Siswa"
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
                    <Check className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
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
