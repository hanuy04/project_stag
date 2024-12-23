
import Topbar from "@/components/navigation/topbar";

const SarprasReservationTemplate = ({ children }) => {
  const menuItems = [
    { menu: "Peminjaman Baru", path: "/peminjaman" },
    { menu: "Cetak Surat Peminjaman", path: "/peminjaman/cetak" },
    { menu: "Riwayat Peminjaman", path: "/peminjaman/riwayat" },
  ];
  return (
    <>
      <Topbar type="button" menuItems={menuItems} />
      {children}
    </>
  );
};

export default SarprasReservationTemplate;
