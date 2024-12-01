import MainLayout from "@/components/layouts/MainLayout";
import RoomReservation from "@/components/peminjaman/RoomReservation";
import Sidebar from "@/components/navigation/sidebar";
import React from "react";

const index = () => {
  return (
    <MainLayout>
      <RoomReservation />
    </MainLayout>
  );
};

export default index;
