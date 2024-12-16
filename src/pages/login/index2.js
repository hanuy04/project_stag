import { Button, Card, CardContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
// import logo from "../../../public/images/logo_stag.png"
import Image from "next/image";

import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "@/store/persistSlices/authSlice";
import { useRouter } from "next/router";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  border: "none",
  width: "100%",
  maxWidth: "28rem",
  [theme.breakpoints.down("md")]: {
    borderRadius: "30px 30px 0 0",
    maxWidth: "100%",
    height: "calc(100vh - 140px)",
    marginTop: "auto",
  },
}));

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
  const token = useSelector((state) => state.persist.auth.token);
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

      console.log("Response status:", response.status);

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
        
      } else {
        const data = await response.json();
        dispatch(refreshToken(data.token));
        router.push("/");
      }

    //   alert(data.token);

    //   console.log("Response data:", data);


    } catch (error) {
      console.error("Error:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue">
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <div className="text-white">
          <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
          </svg>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col md:bg-white md:rounded-l-[50px]">
        <div className="flex md:hidden items-center gap-3 p-4">
          <Image
            src={"/images/logo_stag.png"}
            alt="School Logo"
            width={50}
            height={50}
          />
          <div className="text-white">
            <h1 className="text-xl font-bold">STAGFAST</h1>
            <p className="text-sm">
              Peminjaman ruangan dan pengaduan fasilitas
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <StyledCard>
            <CardContent className="p-6">
              <div className="hidden md:flex items-center gap-4 mb-8">
                {/* <Image
                  src={logo}
                  alt="School Logo"
                  width={50}
                /> */}
                <div>
                  <h1 className="text-2xl font-bold text-blue">STAGFAST</h1>
                  <p className="text-sm text-gray-600">
                    Sistem Fasilitas SMAK Santa Agnes
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Login
                {token}
              </h2>

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
                  Jika terjadi kesalahan, silahkan hubungi tim IT.
                </p>
              </form>
            </CardContent>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
