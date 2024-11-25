import React, { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar'

const MainLayout = ({ children }) => {
    const menuItemsByRole = {
        student: ["Beranda", "Ruangan", "Peminjaman", "Pengaduan"],
        osis: ["Beranda", "Ruangan", "Peminjaman", "Pengaduan"],
        teacher: ["Beranda", "Konfirmasi", "Ruangan", "Peminjaman", "Pengaduan"],
        sarpras: ["Peminjaman", "Pengaduan", "Jadwal", "Fasilitas", "User"],
    };

    const menuItems = menuItemsByRole["osis"];

    return (
        <div className='w-full'>
            <Sidebar menuItems={menuItems}>
                <div className="w-full min-h-screen bg-slate-950 p-4">
                    <div className="ml-auto w-5/6 max-w-full transition-all duration-300">
                        {children}
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default MainLayout;
