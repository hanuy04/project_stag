import React, { useEffect } from "react";
import Sidebar from "../navigation/sidebar";

const MainLayout = ({ children }) => {
  const menuItemsByRole = {
    student: [
      { menu: "Beranda", path: "/" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    osis: [
      { menu: "Beranda", path: "/" },
      { menu: "Ruangan", path: "/ruangan" },
      { menu: "Peminjaman", path: "/peminjaman" },
      { menu: "Pengaduan", path: "/pengaduan" },
    ],
    teacher: [
      { menu: "Beranda", path: "/" },
      { menu: "Konfirmasi", path: "/ruangan" },
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

  const menuItems = menuItemsByRole["sarpras"];

  console.log(menuItems);

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
