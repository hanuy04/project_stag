import Topbar from "@/components/navigation/topbar";
import SarprasReservationTemplate from "./SarprasReservationTemplate";
import { Grid2 } from "@mui/material";
import ClockDisplay from "@/components/general/ClockDisplay";
import ReservationCard from "./ReservationCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GuideSection from "@/components/beranda/guideSection";

const SarprasReservationPage = () => {
  const [peminjaman, setPeminjaman] = useState([]);
  const token = useSelector((state) => state.persist.auth.token);
  const [refreshData, setRefreshData] = useState(false);

  const [expandedPeminjaman, setExpandedPeminjaman] = useState(true);
  const [expandedPengaduan, setExpandedPengaduan] = useState(false);

  useEffect(() => {
    setExpandedPengaduan(!expandedPeminjaman)
  }, [expandedPeminjaman])

  useEffect(() => {
    setExpandedPeminjaman(!expandedPengaduan)
  }, [expandedPengaduan])

  const guideSteps = [
    "Buka menu Jadwal untuk melihat ruangan yang masih tersedia.",
    "Ajukan permintaan peminjaman melalui sistem",
    "Masukkan guru pendamping (jika melewati batas waktu)",
    "Tunggu persetujuan guru pendamping",
    "Tunggu persetujuan dari sarpras",
    "Tunjukkan bukti peminjaman ke CS",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "/api/sarpras/reservations?groupby=room&status_sarpras=pending",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setPeminjaman(data.data);
      } else {
        alert(`${response.status} ${data.error || data.message}`);
      }
      setRefreshData(false);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [token, refreshData]);

  return (
    <>
      <SarprasReservationTemplate>
        <Grid2 container columns={12}>
          <Grid2 item size={8}>
            {peminjaman.map((item, index) => {
              return (
                <ReservationCard key={index} data={item} setRefreshData={setRefreshData} />
              );
            })}
          </Grid2>
          <Grid2 item size={4} paddingLeft={3}>
            <ClockDisplay />
            <GuideSection
              title="Cara Peminjaman Ruangan"
              steps={guideSteps}
              expanded={expandedPeminjaman}
              setExpanded={setExpandedPeminjaman}
            />
            <GuideSection
              title="Cara Pengaduan Fasilitas"
              steps={guideSteps}
              expanded={expandedPengaduan}
              setExpanded={setExpandedPengaduan}
            />
          </Grid2>
        </Grid2>
      </SarprasReservationTemplate>
    </>
  );
};

export default SarprasReservationPage;
