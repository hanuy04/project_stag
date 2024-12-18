import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Create a custom theme (optional)
const theme = createTheme({
  palette: {
    primary: {
      main: "#0c21c1",
    },
  },
});

const LoadingPage = ({ message = "Loading..." }) => {
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
            gap: 3, // Adds space between elements
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "background.paper",
          }}
        >
          <Box display={"flex"} gap={3}>
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" color="text.secondary" margin={"auto"}>
              {message}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoadingPage;
