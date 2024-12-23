import MainLayout from "@/components/layouts/MainLayout";
import RoomReservation from "@/components/peminjaman/RoomReservation";
import Sidebar from "@/components/navigation/sidebar";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SarprasReservationPage from "@/components/sarpras/peminjaman/SarprasReservationPage";

const Peminjaman = () => {
  const role = useSelector((state) => state.persist.auth.user?.role);
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push("/");
    }
  }, [router, role]);

  return (
    <MainLayout>
      {role == "sarpras" && <SarprasReservationPage/>}
      {role != "sarpras" && <RoomReservation />}
    </MainLayout>
  );
};

export default Peminjaman;
