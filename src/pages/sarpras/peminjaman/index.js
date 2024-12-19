import ClockDisplay from "@/components/general/ClockDisplay";
import GuideSection from "@/components/beranda/guideSection";
import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/navigation/navbar";
import UserProfile from "@/components/profile/userProfile";
import { Box, Grid, Grid2 } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <MainLayout>
      <Grid2 container spacing={2}>
        
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <Navbar/>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }} className={"p-3 gap-3"}>
          <Box className={""}></Box>
          <UserProfile />
          <ClockDisplay />
        </Grid2>
      </Grid2>
    </MainLayout>
  );
};

export default index;
