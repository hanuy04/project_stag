import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HelpIcon from "@mui/icons-material/Help";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CheckCircle,
  EventNote,
  Home,
  Person2,
  ReportProblem,
  Schedule,
  Widgets,
} from "@mui/icons-material";
import Topbar from "./topbar";
import { useSelector } from "react-redux";

const getIcon = (name, active) => {
  const color = active ? "text-blue" : "text-white";
  const icons = {
    Beranda: <Home className={color} />,
    Ruangan: <MeetingRoomIcon className={color} />,
    Jadwal: <Schedule className={color} />,
    Peminjaman: <EventNote className={color} />,
    Pengaduan: <ReportProblem className={color} />,
    Konfirmasi: <CheckCircle className={color} />,
    Fasilitas: <Widgets className={color} />,
    User: <Person2 className={color} />,
  };
  return icons[name];
};

const MenuItemContent = ({ item, isActive }) => (
  <motion.div className="flex items-center px-4 py-3" layout>
    <ListItemIcon className="min-w-[40px]">
      {getIcon(item, isActive)}
    </ListItemIcon>
    <motion.div
      className="overflow-hidden whitespace-nowrap"
      style={{ width: "auto" }}
    >
      <ListItemText
        primary={item}
        primaryTypographyProps={{
          className: `transition-colors duration-300 ${
            isActive ? "text-blue-700" : "text-white"
          }`,
        }}
      />
    </motion.div>
  </motion.div>
);

const HelpCenter = () => (
  <motion.div
    className="absolute bottom-4 left-4 right-4"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Box className="bg-white/10 rounded-xl p-4">
      <Box className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center mb-2">
        <HelpIcon className="text-white text-xl" />
      </Box>
      <Typography className="font-semibold mb-1 text-white">
        Pusat Bantuan
      </Typography>
      <Typography className="text-sm text-gray-200 mb-3">
        Jika terjadi kesalahan, silahkan hubungi tim IT.
      </Typography>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/help"
          className="block w-full bg-pink-600 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-pink-700 transition-colors text-center"
        >
          Go To Help Center
        </Link>
      </motion.div>
    </Box>
  </motion.div>
);

const DesktopSidebar = ({ menuItems, pathname }) => {
  return (
    <motion.div
      className="hidden md:block fixed h-full w-[280px]"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout
    >
      <Box className="h-full bg-blue text-white relative">
        <Box className="bg-white">
          <Box
            className={`hidden md:flex items-center bg-blue p-4 ${
              menuItems[0].path === pathname ? "rounded-ee-3xl" : ""
            }`}
          >
            <Box className="w-20 h-20 flex items-center justify-center">
              <img
                src="/images/logo_stag.png"
                alt="Stagfast"
                className="w-16"
              />
            </Box>
            <Typography variant="h5" className="font-bold text-white w-full">
              STAGFAST
            </Typography>
          </Box>
        </Box>

        <List className="m-0 p-0" disablePadding>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const prevItemActive =
              index > 0 && pathname === menuItems[index - 1].path;
            const nextItemActive =
              index < menuItems.length - 1 &&
              pathname === menuItems[index + 1].path;

            return (
              <ListItem key={item.menu} className="p-0 ps-5 m-0" disablePadding>
                <Box className="bg-gray-100 rounded-s-full w-full border-none">
                  <Link
                    href={item.path}
                    className={`w-full block ${
                      isActive ? "bg-gray-100 rounded-s-full" : "bg-blue"
                    } 
                      ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""}
                      ${!isActive && prevItemActive ? "rounded-se-3xl" : ""}`}
                  >
                    <MenuItemContent item={item.menu} isActive={isActive} />
                  </Link>
                </Box>
              </ListItem>
            );
          })}
        </List>

        {menuItems[menuItems.length - 1].path === pathname && (
          <ListItem className="p-0 ps-5 +m-0" disablePadding>
            <Box className="bg-gray-100 rounded-s-full w-full border-none rounded-ee-3xl">
              <Box
                className={
                  "w-full block bg-gray-100 rounded-se-3xl bg-blue py-5"
                }
              ></Box>
            </Box>
          </ListItem>
        )}

        <HelpCenter />
      </Box>
    </motion.div>
  );
};

const MobileSidebar = ({ menuItems, pathname }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MobileTopBar = () => (
    <Box className="md:hidden flex items-center bg-blue p-4 h-[72px]">
      <IconButton className="text-white ml-auto" onClick={handleDrawerToggle}>
        <MenuIcon className="text-white" />
      </IconButton>

      <Box className="w-12 h-12 flex items-center justify-center">
        <img src="/images/logo_stag.png" alt="Stagfast" className="w-10" />
      </Box>
      <Typography variant="h6" className="font-bold text-white ml-2">
        STAGFAST
      </Typography>
    </Box>
  );

  const drawerContent = (
    <Box className="h-full bg-blue text-white relative">
      <Box className="bg-white">
        <Box
          className={`flex items-center bg-blue p-4 ${
            menuItems[0].path === pathname ? "rounded-ee-3xl" : ""
          }`}
        >
          <Box className="w-20 h-20 flex items-center justify-center">
            <img src="/images/logo_stag.png" alt="Stagfast" className="w-16" />
          </Box>
          <Typography variant="h5" className="font-bold text-white w-full">
            STAGFAST
          </Typography>
          <IconButton
            className="text-white ml-auto"
            onClick={handleDrawerToggle}
          >
            <ArrowBackIcon className="text-white" />
          </IconButton>
        </Box>
      </Box>

      <List className="m-0 p-0" disablePadding>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path;

          const prevItemActive =
            index > 0 && pathname === menuItems[index - 1].path;
          const nextItemActive =
            index < menuItems.length - 1 &&
            pathname === menuItems[index + 1].path;

          return (
            <ListItem key={item.menu} className="p-0 ps-5 m-0" disablePadding>
              <Box className="bg-white rounded-s-full w-full border-none">
                <Link
                  href={item.path}
                  className={`w-full block ${
                    isActive ? "bg-white rounded-s-full" : "bg-blue"
                  }
                    ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""}
                    ${!isActive && prevItemActive ? "rounded-se-3xl" : ""}`}
                  onClick={handleDrawerToggle}
                >
                  <MenuItemContent item={item.menu} isActive={isActive} />
                </Link>
              </Box>
            </ListItem>
          );
        })}
      </List>

      <HelpCenter />
    </Box>
  );



  return (
    <>
      <Box className="md:hidden fixed top-0 left-0 right-0 bg-[#0C21C1] z-50">
        <MobileTopBar />
      </Box>

      <Box
        inert={!mobileOpen ? true : undefined}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="md:hidden"
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: "w-[280px] bg-blue",
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

const Sidebar = ({ menuItems = [], children }) => {
  const pathname = usePathname();

  const isAuthenticated = useSelector((state) => state.persist.auth.isAuthenticated);
  if (!isAuthenticated) return null;

  return (
    <Box className="flex">
      <DesktopSidebar menuItems={menuItems} pathname={pathname} />
      <MobileSidebar menuItems={menuItems} pathname={pathname} />

      <Box className="flex-1 transition-all duration-300 pt-[72px] md:pt-0 md:ml-[280px]">

        <Box>
          {children}
        </Box>
        
        
      </Box>
    </Box>
  );
};

export default Sidebar;
