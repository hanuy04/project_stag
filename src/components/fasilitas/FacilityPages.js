import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// interface Room {
//   id: string
//   name: string
//   isLocked: boolean
// }

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

export default function FacilityManagement() {
  const [rooms, setRooms] = useState([
    { id: "x2", name: "X-2", isLocked: true },
    { id: "x3", name: "X-3", isLocked: true },
    { id: "x4", name: "X-4", isLocked: true },
    { id: "x5", name: "X-5", isLocked: true },
    { id: "x6", name: "X-6", isLocked: true },
    { id: "x7", name: "X-7", isLocked: true },
    { id: "xi1", name: "XI-1", isLocked: true },
    { id: "xi2", name: "XI-2", isLocked: true },
    { id: "xi3", name: "XI-3", isLocked: true },
    { id: "xi4", name: "XI-4", isLocked: true },
    { id: "xi5", name: "XI-5", isLocked: true },
    { id: "xi6", name: "XI-6", isLocked: true },
    { id: "xi7", name: "XI-7", isLocked: true },
    { id: "xii1", name: "XII-1", isLocked: true },
    { id: "xii2", name: "XII-2", isLocked: true },
    { id: "xii3", name: "XII-3", isLocked: true },
    { id: "xii4", name: "XII-4", isLocked: true },
    { id: "xii5", name: "XII-5", isLocked: true },
    { id: "xii6", name: "XII-6", isLocked: true },
    { id: "xii7", name: "XII-7", isLocked: true },
    { id: "aud", name: "AUD", isLocked: true },
    { id: "sbg", name: "SBG", isLocked: true },
    { id: "laba", name: "LAB-A", isLocked: true },
    { id: "labb", name: "LAB-B", isLocked: true },
    { id: "labc", name: "LAB-C", isLocked: true },
    { id: "labd", name: "LAB-D", isLocked: true },
    { id: "labe", name: "LAB-E", isLocked: true },
  ]);

  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sistem Fasilitas SMAK Santa Agnes
            </Typography>
            <Button
              color="inherit"
              endIcon={<ArrowDropDownIcon />}
              onClick={handleMenuOpen}
            >
              Tim Sarpras
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar> */}

        <div className="flex items-center justify-between p-4">
          <div className="flex rounded-lg border border-[#3f51b5] overflow-hidden">
            <Tabs valuevalue={tabValue} onChange={handleTabChange} centered>
              <Tab
                variant="contained"
                sx={{
                  bgcolor: "#3f51b5",
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    bgcolor: "#32408f",
                  },
                  flex: 1,
                  minWidth: "200px",
                }}
                label="Daftar Kelas"
              />
              <Tab
                variant="contained"
                sx={{
                  bgcolor: "#3f51b5",
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    bgcolor: "#32408f",
                  },
                  flex: 1,
                  minWidth: "200px",
                }}
                label="Daftar Fasilitas"
              />
            </Tabs>
          </div>

          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuOpen}
            sx={{
              bgcolor: "#3f51b5",
              borderRadius: "50px",
              px: 3,
              "&:hover": {
                bgcolor: "#32408f",
              },
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* <PersonIcon /> Tim Sarpras */}
            </Typography>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>

        <div style={{ padding: "20px" }}>

          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Card
                sx={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed #ccc",
                  cursor: "pointer",
                }}
              >
                <AddIcon sx={{ fontSize: 40, color: "#ccc" }} />
              </Card>
            </Grid>
            {rooms.map((room) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={room.id}>
                <Card sx={{ height: 120 }}>
                  <CardHeader
                    title={room.name}
                    titleTypographyProps={{ align: "center", variant: "h6" }}
                    sx={{ backgroundColor: "#f5f5f5", padding: 1 }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      padding: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": { backgroundColor: "secondary.dark" },
                      }}
                    >
                      <LockIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": { backgroundColor: "secondary.dark" },
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px", color: "gray" }}
          >
            2020 © Sistem Fasilitas SMAK Santa Agnes
          </Typography>
        </div>
      </>
    </ThemeProvider>
  );
}
