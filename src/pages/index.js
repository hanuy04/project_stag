import MainLayout from "@/components/layout/MainLayout";
import Sidebar from "@/components/sidebar/sidebar";


export default function Home() {

  const menuItems = [
    "Beranda", "Peminjaman"
  ];

  return (
    <MainLayout >
      <Sidebar menuItems={menuItems} />
      <div className="md:ml-64 p-4">
        {/* Content goes here */}
      </div>
    </MainLayout>
  );
}
