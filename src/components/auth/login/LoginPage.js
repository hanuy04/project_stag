import { Button, Card, CardContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { login } from "@/store/persistSlices/authSlice";
import { useRouter } from "next/router";
import AuthLayout from "@/components/layouts/AuthLayout";

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

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        dispatch(login(data));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Login</h2>

      <form className="space-y-6" onSubmit={handleLogin}>
        <StyledTextField
          fullWidth
          placeholder="Nomor Induk"
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

        <StyledButton
          fullWidth
          variant="contained"
          type="submit"
          className="bg-blue hover:bg-blue-700 normal-case py-3"
        >
          Log In
        </StyledButton>
        <p className="text-center text-sm text-gray-600">
          Belum punya akun? Daftar <a href="/register">disini</a>
        </p>

        <p className="text-center text-sm text-gray-600">
          Jika terjadi kesalahan, silahkan hubungi tim IT.
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
