import MainLayout from "@/components/layouts/MainLayout";
import RoomReservation from "@/components/peminjaman/RoomReservation";
import { useSelector } from "react-redux";
import SarprasReservationPage from "@/components/sarpras/peminjaman/SarprasReservationPage";

const Peminjaman = () => {
  const role = useSelector((state) => state.persist.auth.user?.role);

  return (
    <MainLayout pageRole={["teacher", "student", "osis"]}>
      <RoomReservation />
    </MainLayout>
  );
};

export default Peminjaman;
