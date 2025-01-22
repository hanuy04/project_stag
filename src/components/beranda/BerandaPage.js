import GuideSection from "@/components/beranda/guideSection";
import RequestSection from "@/components/beranda/requestSection";
import MainLayout from "@/components/layouts/MainLayout";
import UserProfile from "@/components/profile/userProfile";
import { verifyToken } from "@/utils/verifyUser";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid2,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PeminjamanSection from "./peminjaman/PeminjamanSection";
import LoadingPage from "../general/LoadingPage";
import ClockDisplay from "../general/ClockDisplay";
import Profile from "../general/Profile";
import PengaduanSection from "./pengaduan/PengaduanSection";

export default function BerandaPage() {
  const token = useSelector((state) => state.persist.auth.token);
  const username = useSelector((state) => state.persist.auth.user.username);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [peminjaman, setPeminjaman] = useState([]);
  const [pengaduan, setPengaduan] = useState([]);

  const [expandedPeminjaman, setExpandedPeminjaman] = useState(true);
  const [expandedPengaduan, setExpandedPengaduan] = useState(false);

  useEffect(() => {
    setExpandedPengaduan(!expandedPeminjaman)
  }, [expandedPeminjaman])

  useEffect(() => {
    setExpandedPeminjaman(!expandedPengaduan)
  }, [expandedPengaduan])


  useEffect(() => {
    const fetchData = async (endpoint, setData) => {
      try {
        if (!token) {
          alert("Token is missing!");
          router.push("/login")
          return;
        }

        const response = await fetch(`/api/${endpoint}?username=${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          alert(JSON.stringify(errorData.message));
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Error:", error);
        // setError(error.message);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await fetchData("peminjaman", setPeminjaman);
      await fetchData("complains", setPengaduan);
      setLoading(false);
    };

    fetchAllData();
  }, [token]);

  const guideSteps = [
    "Buka menu Jadwal untuk melihat ruangan yang masih tersedia.",
    "Ajukan permintaan peminjaman melalui sistem",
    "Masukkan guru pendamping (jika melewati batas waktu)",
    "Tunggu persetujuan guru pendamping",
    "Tunggu persetujuan dari sarpras",
    "Tunjukkan bukti peminjaman ke CS",
  ];

  return (
    <>
      {loading && <LoadingPage />}

      {!loading && (
        <MainLayout>
          <Grid2 container columns={12}>
            <Grid2 size={4} padding={3} paddingRight={0}>
              <PeminjamanSection
                title="Peminjaman Terakir"
                reservations={peminjaman}
              />
            </Grid2>
            <Grid2 size={4} padding={3} paddingRight={0}>
              <PengaduanSection
                title="Pengaduan Terakhir"
                pengaduan={pengaduan}
              />
            </Grid2>
            <Grid2 size={4} padding={3}>
              <Profile />
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
        </MainLayout>
      )}
    </>
  );
}
