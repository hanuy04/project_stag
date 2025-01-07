import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0c21c1",
    },
  },
});

const RedirectPage = ({ message }) => {
  const router = useRouter();

  const handleRedirectToLogin = () => {
    router.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#0c21c1",
          padding: 0,
          margin: 0,
          width: "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "error.main" }}
          >
            {message}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Silakan login kembali untuk melanjutkan.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirectToLogin}
            sx={{
              mt: 2,
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Kembali ke Halaman Login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RedirectPage;
