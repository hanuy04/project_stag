import { Box, Typography } from '@mui/material';
import PeminjamanCard from './PeminjamanCard';
// import CardRequest from './CardRequest';

const PeminjamanSection = ({ title, requests }) => {

    return (
        <Box className="bg-white p-5 rounded-xl shadow-lg">
            <Typography variant="h5" color='blue'>
                {title}
            </Typography>
            <Box className="" >
                {requests.map((request, index) => (
                    <PeminjamanCard key={index} {...request} />
                ))}
            </Box>
        </Box>
    );
}

export default PeminjamanSection