import { Box, Typography } from '@mui/material';
import CardRequest from './CardRequest';

const RequestSection = ({ title, requests }) => {
    return (
        <Box>
            <Typography variant="h5" className="mb-4">
                {title}
            </Typography>
            <Box className="space-y-4">
                {requests.map((request, index) => (
                    <CardRequest key={index} {...request} />
                ))}
            </Box>
        </Box>
    );
}

export default RequestSection
