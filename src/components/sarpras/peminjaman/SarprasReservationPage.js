import MainLayout from "../../layouts/MainLayout";
import Profile from "../../profile/Profile";
import ClockDisplay from "../../general/ClockDisplay";
import { Grid2 } from "@mui/material";
import JadwalPeminjaman from "./JadwalPeminjaman";

const SarprasReservationPage = () => {
  return (
    <Grid2 container columns={12}>
      <Grid2 size={4} padding={3} paddingRight={0}>
        {/* <PeminjamanSection
                title="Peminjaman Aktif"
                requests={currentRequests}
              /> */}
      </Grid2>
      <Grid2 size={4} padding={3} paddingRight={0}>
        {/* <PeminjamanSection
                title="Peminjaman Aktif"
                requests={currentRequests}
              /> */}
      </Grid2>
      <Grid2 size={4} padding={3}>
        <Profile />
        <ClockDisplay />
        
      </Grid2>
    </Grid2>
  );
};

export default SarprasReservationPage;
