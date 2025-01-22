import { Box, Button, Typography } from '@mui/material';
import PeminjamanCard from './PeminjamanCard';
import { Color } from '@/styles/Color';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import CardRequest from './CardRequest';

const PeminjamanSection = ({ title, reservations }) => {

    const router = useRouter()

    return (
        <Box className="bg-white p-5 rounded-xl shadow-lg ">
            <Typography variant="h5" color='blue'>
                {title}
            </Typography>

            {
                reservations?.length > 0 ? (
                    <Box className="container ">
                        {reservations.map((peminjaman) => (
                            <PeminjamanCard key={peminjaman.reservation_id} reservation={peminjaman} />
                        ))}

                        <Button sx={{
                            alignContent: "end",
                            backgroundColor: Color.blue,
                            color: 'white',
                            width: '100%',
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'darkblue', // Warna saat hover
                            },

                        }} fullWidth onClick={() => router.push("/peminjaman")}>Peminjaman Lainnya</Button>
                    </Box>
                ) : (
                    <p>No reservations found.</p>
                )
            }


        </Box >
    );
}

export default PeminjamanSection