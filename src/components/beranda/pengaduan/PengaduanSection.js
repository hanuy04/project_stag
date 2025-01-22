import { Box, Button, Typography } from '@mui/material';
import PengaduanCard from './PengaduanCard';
import { Color } from '@/styles/Color';
import { useRouter } from 'next/router';

const PengaduanSection = ({ title, pengaduan }) => {

    const router = useRouter()

    return (
        <Box className="bg-white p-5 rounded-xl shadow-lg">
            <Typography variant="h5" color='blue'>
                {title}
            </Typography>

            {
                pengaduan?.length > 0 ? (
                    <Box
                        className="container "
                        sx={{
                            minHeight: "100%",
                            display: "flex", // Jadikan Box sebagai flex container
                            flexDirection: "column", // Susun anak-anak secara vertikal
                            alignItems: "normal"
                        }}
                    >
                        {/* Konten utama (daftar pengaduan) */}
                        <Box className="mb-auto" sx={{ flexGrow: 1 }}>
                            {pengaduan.map((pengaduan) => (
                                <PengaduanCard key={pengaduan.complain_id} pengaduan={pengaduan} />
                            ))}
                        </Box>

                        {/* Tombol di bagian bawah */}
                        <Button
                            className='mt-auto'
                            sx={{
                                backgroundColor: Color.blue,
                                color: "white",
                                width: "100%",
                                transition: "background-color 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "darkblue", // Warna saat hover
                                },

                            }}
                            fullWidth
                            onClick={() => router.push("/pengaduan")}
                        >
                            lainnya
                        </Button>
                    </Box>
                ) : (
                    <p>No reservations found.</p>
                )
            }


        </Box>
    );
}

export default PengaduanSection