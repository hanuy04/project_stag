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
// import Profile from "../general/Profile";
import PeminjamanSection from "./peminjaman/PeminjamanSection";
import LoadingPage from "../general/LoadingPage";
import ClockDisplay from "../general/ClockDisplay";
import Profile from "../general/Profile";

export default function BerandaPage() {
  const token = useSelector((state) => state.persist.auth.token);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [peminjaman, setPeminjaman] = useState([]);

  useEffect(() => {
    const fetchPeminjaman = async () => {
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch("/api/peminjaman", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        if (!response.ok) {
          // router.push("/");
        } else {
          const data = await response.json();
          // alert(JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        // alert(`Error: ${error.message}`);
        router.push("/");
      }
    };

    fetchPeminjaman();
  }, [token]);

  const currentRequests = [
    {
      title: "Ruang XII - 5",
      date: "Mon, 14 Oct 2024",
      time: "16:00 - 18:00",
      description:
        "Rapat OSIS persiapan acara tahunan, pembagian tugas dan perencanaan anggaran",
      status: "pending",
      type: "pending",
      supervisor: "Bernardus Totok, S.Psi.",
    },
    {
      title: "Ruang XII - 5",
      date: "Mon, 14 Oct 2024",
      time: "16:00 - 18:00",
      description:
        "Rapat OSIS persiapan acara tahunan, pembagian tugas dan perencanaan anggaran",
      status: "pending",
      type: "pending",
      supervisor: "Bernardus Totok, S.Psi.",
    },
  ];

  const guideSteps = [
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  ];

  const complaints = [
    {
      title: "AC [Ruang XII-6]",
      date: "Mon, 14 Oct 2024",
      time: "13:05",
      description:
        "AC di ruangan ini tidak terasa dingin meskipun sudah dinyalakan cukup lama",
      status: "processing",
      type: "processing",
      files: 2,
    },
    // Add more complaints as needed
  ];

  return (
    <>
      {loading && <LoadingPage />}

      {!loading && (
        <MainLayout>
          <Grid2 container columns={12}>
            <Grid2 size={4} padding={3} paddingRight={0}>
              <PeminjamanSection
                title="Peminjaman Aktif"
                requests={currentRequests}
              />
            </Grid2>
            <Grid2 size={4} padding={3} paddingRight={0}>
              <PeminjamanSection
                title="Peminjaman Aktif"
                requests={currentRequests}
              />
            </Grid2>
            <Grid2 size={4} padding={3}>
              <Profile />
              <ClockDisplay />
              <GuideSection
                title="Tata Cara Peminjaman Ruangan"
                steps={guideSteps}
              />
              <GuideSection
                title="Tata Cara Pengaduan Fasilitas"
                steps={guideSteps}
              />
            </Grid2>
          </Grid2>
        </MainLayout>
      )}
    </>
  );
}
