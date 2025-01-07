import Topbar from "@/components/navigation/topbar";

const SarprasReservationTemplate = ({ children }) => {
  const menuItems = [
    { menu: "Peminjaman Baru", path: "/sarpras/peminjaman" },
    // { menu: "Cetak Surat Peminjaman", path: "/sarpras/peminjaman/cetak" },
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
