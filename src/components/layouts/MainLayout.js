import React, { useEffect } from "react";
import Sidebar from "../navigation/sidebar";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {

  const role = useSelector((state) => state.persist.auth.user?.role);

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
      { menu: "Beranda", path: "/" },
      { menu: "Konfirmasi", path: "/konfirmasi" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    sarpras: [
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/sarpras/pengaduan" },
      { menu: "Jadwal", path: "/sarpras/jadwal" },
      { menu: "Fasilitas", path: "/sarpras/fasilitas" },
      { menu: "User", path: "/sarpras/user" },
    ],
  };

  const menuItems = menuItemsByRole[role] || [];

  return (
    <div className="w-full">
      <Sidebar menuItems={menuItems}>
        <div className="w-full min-h-full bg-gray-100">
          <div className="w-full transition-all duration-300 bg-gray-100">
            {children}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default MainLayout;
