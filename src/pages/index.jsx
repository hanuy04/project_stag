import GuideSection from "@/components/beranda/guideSection";
import RequestSection from "@/components/beranda/requestSection";
import MainLayout from "@/components/layouts/MainLayout";
import UserProfile from "@/components/profile/userProfile";
import { Box } from "@mui/material";

export default function Home() {

  const currentRequests = [
    {
      title: "Ruang XII - 5",
      date: "Mon, 14 Oct 2024",
      time: "16:00 - 18:00",
      description: "Rapat OSIS persiapan acara tahunan, pembagian tugas dan perencanaan anggaran",
      status: "pending",
      type: "pending",
      supervisor: "Bernardus Totok, S.Psi."
    },

  ];

  const guideSteps = [
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  ];

  const complaints = [
    {
      title: "AC [Ruang XII-6]",
      date: "Mon, 14 Oct 2024",
      time: "13:05",
      description: "AC di ruangan ini tidak terasa dingin meskipun sudah dinyalakan cukup lama",
      status: "processing",
      type: "processing",
      files: 2
    },
    // Add more complaints as needed
  ];

  return (
    <MainLayout>
      <div className="bg-yellow-300">
       <Box className="flex min-h-screen bg-gray-100">

       <Box className="flex-1 p-8">
          <Box className="flex justify-between items-start mb-8">
           <Box>
              <RequestSection
                title="Peminjaman Aktif"
                requests={currentRequests}
              />
            </Box>

            <Box className="w-96">
              <UserProfile
                user="Agnes [12345]"
                time="12:12"
                date="14 September 2024 Minggu"
                schedule="15:00 - 17:00"
              />

              <GuideSection
                title="Tata Cara Peminjaman Ruangan"
                steps={guideSteps}
              />
              <GuideSection
                title="Tata Cara Pengaduan Fasilitas"
                steps={guideSteps}
              />
            </Box>
          </Box>

          <RequestSection
            title="Pengaduan Aktif"
            requests={complaints}
          />
        </Box>
      </Box> 
    </div>
    </MainLayout>
  );
}