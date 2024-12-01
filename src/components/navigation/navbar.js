import { Box, Typography, Button } from "@mui/material";

const Navbar = ({ menuItems = [] }) => {
  return (
    <Box className="bg-white py-3 px-6 flex justify-between items-center rounded-3xl border ">
      <Box>
        {menuItems.map((item, index) => {
          return (
            <>
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 mr-4 text-white"
                sx={{
                  borderRadius: "8px",
                }}
              >
                Cetak Surat Peminjaman
              </Button>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Navbar;
