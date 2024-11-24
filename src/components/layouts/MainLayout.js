import React from 'react'
import Sidebar from '../sidebar/sidebar'

const MainLayout = ({ children }) => {
    const menuItems = [
        "Beranda", "Ruangan", "Peminjaman", "Pengaduan"
    ];

    return (
        <>
            <Sidebar menuItems={menuItems} />
            <div className="md:ml-64 p-4">
                {children}
            </div>
        </>
    )
}

export default MainLayout
