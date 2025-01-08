import MainLayout from "@/components/layouts/MainLayout";
import SarprasJadwalRiwayatPage from "@/components/sarpras/peminjaman/SarprasJadwalRiwayatPage";
import SarprasReservationPage from "@/components/sarpras/peminjaman/SarprasReservationPage";
import SarprasReservationRiwayatPage from "@/components/sarpras/peminjaman/SarprasReservationRiwayatPage";

const SarprasReservation = () => {
  return (
    <MainLayout pageRole={["sarpras"]}>
      <SarprasReservationRiwayatPage />
    </MainLayout>
  );
};

export default SarprasReservation;
