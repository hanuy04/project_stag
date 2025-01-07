import MainLayout from "@/components/layouts/MainLayout";
import SarprasJadwalPage from "@/components/sarpras/jadwal/SarprasJadwalPage";

const SarprasJadwal = () => {
  return (
    <MainLayout pageRole={["sarpras"]}>
      <SarprasJadwalPage />
    </MainLayout>
  );
};

export default SarprasJadwal;
