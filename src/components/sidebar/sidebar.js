import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import foto from "../../../public/images/logo_stag.png"

const getIcon = (name) => {
  const icons = {
    'Beranda': <GridViewIcon className="text-white" />,
    'Ruangan': <MeetingRoomIcon className="text-white" />,
    'Peminjaman': <AccessTimeIcon className="text-white" />,
    'Pengaduan': <ChatIcon className="text-white" />
  };
  return icons[name] || <GridViewIcon className="text-white" />;
};

const getPath = (name) => {
  const paths = {
    'Beranda': '/',
    'Ruangan': '/ruangan',
    'Peminjaman': '/peminjaman',
    'Pengaduan': '/pengaduan'
  };
  return paths[name] || '/';
};

const Sidebar = ({ menuItems = [], children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box className="h-full bg-blue text-white relative">
      {/* Header with Logo */}
      <Box className="flex items-center gap-1 p-4">
        <Box className="w-20 h-20 flex items-center justify-center">
          <img src="/images/logo_stag.png" alt="Stagfast" className="w-16" />
        </Box>
        <Typography variant="h4" className="font-bold text-white w-20">
          STAGFAST
        </Typography>
        
        <IconButton
          className="text-white ml-auto md:hidden"
          onClick={handleDrawerToggle}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List className="mt-4">
        {menuItems.map((item) => {
          const path = getPath(item);
          const isActive = pathname === path;

          return (
            <ListItem
              key={item}
              className="p-0"
              disablePadding
            >
              <Link
                href={path}
                className={`w-full block ${isActive
                    ? "bg-blue-700"
                    : "hover:bg-blue-700"
                  }`}
              >
                <Box className="flex items-center px-4 py-3">
                  <ListItemIcon className="min-w-[40px]">
                    {getIcon(item)}
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      className: "text-white"
                    }}
                  />
                </Box>
              </Link>
            </ListItem>
          );
        })}
      </List>

      {/* Help Center Section */}
      <Box className="absolute bottom-4 left-4 right-4">
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
          <Link
            href="/help"
            className="block w-full bg-pink-600 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-pink-700 transition-colors text-center"
          >
            Go To Help Center
          </Link>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="flex">
      {/* Mobile Header */}
      <Box className="md:hidden fixed top-0 left-0 right-0 bg-[#0C21C1] z-50">
        <Box className="flex items-center p-4">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="text-white"
          >
            <MenuIcon />
          </IconButton>
          <Box className="flex items-center gap-2 ml-2">
            <Box className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
              <img src={foto} alt="Stagfast" className="w-6 h-6" />
            </Box>
            <Typography variant="h6" className="font-bold text-white">
              STAGFAST
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        className="hidden md:block w-[280px] fixed h-full"
        component="nav"
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="md:hidden"
        ModalProps={{
          keepMounted: true
        }}
        PaperProps={{
          className: 'w-[280px]'
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Main Content Wrapper */}
      <Box className="flex-1 md:ml-[280px] pt-[72px] md:pt-0">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;