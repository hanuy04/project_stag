import { Box, Typography } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

export default function UserProfile({ user, date, time, schedule }) {
  return (
    <Box className="bg-blue-600 text-white p-4 rounded-lg mb-6">
      <Box className="flex justify-between items-center">
        <Typography>{user}</Typography>
        <ArrowDropDownIcon />
      </Box>
      <Typography variant="h3" className="my-4">{time}</Typography>
      <Typography>{date}</Typography>
      <Box className="mt-4 bg-white/10 p-4 rounded">
        <Typography>Peminjaman ruangan hari ini</Typography>
        <Typography variant="h6">{schedule}</Typography>
      </Box>
    </Box>
  );
}