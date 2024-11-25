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
  Typography,
  Tooltip
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const getIcon = (name, active) => {
  const color = active ? "text-blue" : "text-white"
  const icons = {
    'Beranda': <GridViewIcon className={color} />,
    'Ruangan': <MeetingRoomIcon className={color} />,
    'Peminjaman': <AccessTimeIcon className={color} />,
    'Pengaduan': <ChatIcon className={color} />,
    'Konfirmasi' : <TaskAltIcon className={color}/>
  };
  return icons[name]
};

const getPath = (name) => {
  const paths = {
    'Beranda': '/',
    'Ruangan': '/ruangan',
    'Peminjaman': '/peminjaman',
    'Pengaduan': '/pengaduan',
    'Konfirmasi': '/konfirmasi'
  };
  return paths[name] || '/';
};

const Sidebar = ({ menuItems = [], children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const DesktopHeader = () => (
    <Box className={`hidden md:flex items-center ${pathname == getPath(menuItems[0]) ? 'rounded-ee-3xl' : ""} bg-blue p-4`}>
      <Box className={`${isCollapsed ? 'w-12' : 'w-20'} h-20 flex items-center justify-center transition-all duration-300`}>
        <img src="/images/logo_stag.png" alt="Stagfast" className={`${isCollapsed ? 'w-10' : 'w-16'} transition-all duration-300`} />
      </Box>
      {!isCollapsed && (
        <Typography variant="h5" className="font-bold text-white w-full">
          STAGFAST
        </Typography>
      )}
      <IconButton
        className="text-white ml-auto"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <ArrowForwardIcon className='text-white' /> : <ArrowBackIcon className='text-white' />}
      </IconButton>
    </Box>
  );

  const MobileHeader = () => (
    <Box className={`md:hidden flex items-center ${pathname == getPath(menuItems[0]) ? 'rounded-ee-3xl' : ""} bg-blue p-4`}>
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
        <ArrowBackIcon className='text-white' />
      </IconButton>
    </Box>
  );


  const sidebarContent = (
    <Box className="h-full bg-blue text-white relative">
      {/* Header with Logo */}
      <Box className="bg-white">
        <DesktopHeader />
        <MobileHeader />
      </Box>

      <List className="m-0 p-0" disablePadding>
        {menuItems.map((item, index) => {
          const path = getPath(item);
          const isActive = pathname === path;
          const isLastItemActive = pathname == getPath(menuItems[menuItems.length - 1]);
          const prevItemActive = pathname == getPath(menuItems[index - 1]);
          const nextItemActive = index < menuItems.length - 1 && pathname === getPath(menuItems[index + 1]);

          if (isLastItemActive) {
            menuItems.push("");
          }
          
          const menuItem = (
            <Box className="flex items-center px-4 py-3">
              <ListItemIcon className="min-w-[40px]">
                {getIcon(item, isActive)}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    className: isActive ? "text-blue-700" : "text-white"
                  }}
                />
              )}
            </Box>
          );

          return (
            <ListItem
              key={item}
              className="p-0 ps-5 m-0"
              disablePadding
            >
              <Box className={"bg-white rounded-s-full w-full border-none"}>
                {isCollapsed ? (
                  <Tooltip title={item} placement="right">
                    <Link
                      href={path}
                      className={`w-full block ${isActive
                        ? "bg-white rounded-s-full"
                        : "bg-blue hover:px-5"
                        } ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""
                        } ${!isActive && prevItemActive ? "rounded-se-3xl" : ""
                        }`}
                    >
                      {menuItem}
                    </Link>
                  </Tooltip>
                ) : (
                  <Link
                    href={path}
                    className={`w-full block ${isActive
                      ? "bg-white rounded-s-full"
                      : "bg-blue hover:px-5"
                      } ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""
                      } ${!isActive && prevItemActive ? "rounded-se-3xl" : ""
                      }`}
                  >
                    {menuItem}
                  </Link>
                )}
              </Box>
            </ListItem>
          );
        })}
      </List>
      
      
      {/* Help Center Section */}
      {!isCollapsed && (
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
      )}
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
              <img src="/images/logo_stag.png" alt="Stagfast" className="w-6 h-6" />
            </Box>
            <Typography variant="h6" className="font-bold text-white">
              STAGFAST
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        className={`hidden md:block ${isCollapsed ? 'w-[100px]' : 'w-[280px]'} fixed h-full transition-all duration-300`}
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
      <Box className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-[100px]' : 'md:ml-[280px]'} pt-[72px] md:pt-0`}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;