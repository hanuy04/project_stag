import ClockDisplay from "@/components/general/ClockDisplay";
import GuideSection from "@/components/beranda/guideSection";
import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/navigation/navbar";
import UserProfile from "@/components/profile/userProfile";
import { Box, Grid2 } from "@mui/material";
import React from "react";
import SarprasReservationPage from "@/components/sarpras/peminjaman/SarprasReservationPage";

const SarprasReservation = () => {
  return (
    <MainLayout pageRole={["sarpras"]}>
      <SarprasReservationPage />
    </MainLayout>
  );
};

export default SarprasReservation;
