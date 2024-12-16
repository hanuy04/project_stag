import BerandaPage from "@/components/beranda/BerandaPage";
import { verifyToken } from "@/utils/verifyUser";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Beranda = () => {
  return <BerandaPage />;
};

export default Beranda;
