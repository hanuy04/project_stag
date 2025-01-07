import React, { useEffect, useState } from "react";
import Sidebar from "../navigation/sidebar";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";

import { useRouter } from "next/router";
import { verifyToken } from "@/utils/verifyUser";
import RedirectPage from "../general/RedirectPage";
import LoadingPage from "../general/LoadingPage";
import ForbiddenPage from "../general/ForbiddenPage";

const MainLayout = ({ children, pageRole = [] }) => {
  const menuItemsByRole = {
    student: [
      { menu: "Beranda", path: "/beranda" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    osis: [
      { menu: "Beranda", path: "/beranda" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    teacher: [
      { menu: "Beranda", path: "/beranda" },
      { menu: "Konfirmasi", path: "/konfirmasi" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    sarpras: [
      { menu: "Peminjaman", path: "/sarpras/peminjaman" },
      { menu: "Pengaduan", path: "/sarpras/pengaduan" },
      { menu: "Jadwal", path: "/sarpras/jadwal" },
      { menu: "Fasilitas", path: "/sarpras/fasilitas" },
      { menu: "User", path: "/sarpras/user" },
    ],
  };

  const role = useSelector((state) => state.persist.auth.user?.role);
  const menuItems = menuItemsByRole[role] || [];
  const token = useSelector((state) => state.persist.auth?.token);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsTokenValid(false);
        router.push("/");
        return;
      }
      const verified = await verifyToken(token);
      if (!verified.success) {
        setIsTokenValid(false);
      } else {
        setIsTokenValid(true);
      }
      setLoading(false);
    };

    verify();
    const intervalId = setInterval(verify, 10 * 1000);
    return () => clearInterval(intervalId);
  }, [token, router]);

  if (loading) {
    return <LoadingPage />;
  } else if (!isTokenValid) {
    return <RedirectPage message={"Session telah berakhir"} />;
  }

  if (role && pageRole.length > 0 && !pageRole.includes(role)) {
    return <ForbiddenPage />;
  }

  return (
    <div className="w-full ">
      <Sidebar menuItems={menuItems}>
        <Box padding={4} sx={{ minHeight: "100vh" }}>
          {children}
        </Box>
      </Sidebar>
    </div>
  );
};

export default MainLayout;
