import Topbar from "@/components/navigation/topbar";

const SarprasReservationTemplate = ({ children }) => {
  const menuItems = [
    { menu: "Peminjaman Baru", path: "/sarpras/peminjaman" },
    { menu: "Peminjaman Terjadwal", path: "/sarpras/peminjaman/jadwal" },
    { menu: "Riwayat Peminjaman", path: "/sarpras/peminjaman/riwayat" },
  ];
  return (
    <>
      <Topbar type="button" menuItems={menuItems} />
      {children}
    </>
  );
};

export default SarprasReservationTemplate;
