import { Box, Button, ButtonGroup } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ menuItems = [] }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <ButtonGroup fullWidth>
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant={pathname === item.path ? "contained" : "outlined"}
          sx={{
            borderRadius: "8px",
            backgroundColor: pathname === item.path ? "#0c21c1" : "#ffffff",
            color: pathname === item.path ? "#ffffff" : "#0c21c1",
            borderColor: "#0c21c1",
          }}
          onClick={() => router.push(item.path)}
        >
          {item.menu}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Navbar;
