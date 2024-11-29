import React, { useEffect } from "react";
import Sidebar from "../sidebar/sidebar";

const MainLayout = ({ children }) => {
  const menuItemsByRole = {
    student: ["Beranda", "Ruangan", "Peminjaman", "Pengaduan"],
    osis: ["Beranda", "Ruangan", "Peminjaman", "Pengaduan"],
    teacher: ["Beranda", "Konfirmasi", "Ruangan", "Peminjaman", "Pengaduan"],
    sarpras: ["Peminjaman", "Pengaduan", "Jadwal", "Fasilitas", "User"],
  };

  const menuItems = menuItemsByRole["teacher"];

  return (
    <div className="w-full">
      <Sidebar menuItems={menuItems}>
        <div className="w-full min-h-full bg-slate-950">
          <div className="w-full transition-all duration-300">
            {children}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default MainLayout;
