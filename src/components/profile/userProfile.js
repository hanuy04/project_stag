import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Person2, ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="rounded-3xl bg-blue px-3 w-full">
      <Box className="profile-header flex items-center">
        <Person2 className="text-white m-2" />
        <Box className="profile-info flex items-center justify-between w-full">
          <Typography className="text-white">Agnes [12345]</Typography>
          <IconButton
            aria-controls={open ? "logout-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ArrowDropDown className="text-white" />
          </IconButton>
          <Menu
            id="logout-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "logout-button",
            }}
          >
            <MenuItem className="p-0 m-0" onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
