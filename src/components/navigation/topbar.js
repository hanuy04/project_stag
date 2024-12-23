import React from "react";
import { Button, ButtonGroup, Grid2, Typography } from "@mui/material";
import Profile from "../general/Profile";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const Topbar = ({ type, menuItems, title }) => {
  const pathname = usePathname();

  return (
    <Grid2 container paddingBottom={2}>
      <Grid2 item size={8}>
        {type === "button" && <Navbar menuItems={menuItems} />}
        {title && (
          <Typography paddingLeft={2} fontWeight={"bold"} variant="h4">
            {title}
          </Typography>
        )}
      </Grid2>
      <Grid2 item size={4} paddingLeft={3}>
        <Profile />
      </Grid2>
    </Grid2>
  );
};

export default Topbar;
