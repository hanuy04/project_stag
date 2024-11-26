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
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import GridViewIcon from '@mui/icons-material/GridView';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const getIcon = (name, active) => {
  const color = active ? "text-blue" : "text-white"
  const icons = {
    'Beranda': <GridViewIcon className={color} />,
    'Ruangan': <MeetingRoomIcon className={color} />,
    'Peminjaman': <AccessTimeIcon className={color} />,
    'Pengaduan': <ChatIcon className={color} />,
    'Konfirmasi': <TaskAltIcon className={color} />
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

const MenuItemContent = ({ item, isActive, isCollapsed }) => (
  <motion.div className="flex items-center px-4 py-3" layout>
    <ListItemIcon className="min-w-[40px]">
      {getIcon(item, isActive)}
    </ListItemIcon>
    {!isCollapsed && (
      <motion.div
        initial={false}
        className="overflow-hidden whitespace-nowrap"
        style={{ width: isCollapsed ? 0 : 'auto' }}
      >
        <ListItemText
          primary={item}
          primaryTypographyProps={{
            className: `transition-colors duration-300 ${isActive ? "text-blue-700" : "text-white"}`
          }}
        />
      </motion.div>
    )}
  </motion.div>
);

const HelpCenter = ({ isCollapsed, isMobile }) => (
  <AnimatePresence>
    {(!isCollapsed || isMobile) && (
      <motion.div
        className="absolute bottom-4 left-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
    )}
  </AnimatePresence>
);

const DesktopSidebar = ({ menuItems, pathname }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <motion.div
      className="hidden md:block fixed h-full"
      initial={{ width: isCollapsed ? 100 : 280 }}
      animate={{ width: isCollapsed ? 100 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      layout
    >
      <Box
        className="h-full bg-blue text-white relative"
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <Box className="bg-white">
          <Box className="hidden md:flex items-center bg-blue p-4">
            <Box className={`${isCollapsed ? 'w-12' : 'w-20'} h-20 flex items-center justify-center transition-all duration-300`}>
              <img src="/images/logo_stag.png" alt="Stagfast" className={`${isCollapsed ? 'w-10' : 'w-16'} transition-all duration-300`} />
            </Box>
            {!isCollapsed && (
              <Typography variant="h5" className="font-bold text-white w-full">
                STAGFAST
              </Typography>
            )}
          </Box>
        </Box>

        <List className="m-0 p-0" disablePadding>
          {menuItems.map((item, index) => {
            const path = getPath(item);
            const isActive = pathname === path;
            const prevItemActive = pathname === getPath(menuItems[index - 1]);
            const nextItemActive = index < menuItems.length - 1 && pathname === getPath(menuItems[index + 1]);

            return (
              <ListItem
                key={item}
                className="p-0 ps-5 m-0"
                disablePadding
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Box className="bg-white rounded-s-full w-full border-none">
                  {isCollapsed ? (
                    <Tooltip title={item} placement="right">
                      <Link
                        href={path}
                        className={`w-full block ${isActive ? "bg-white rounded-s-full" : "bg-blue"} 
                          ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""}
                          ${!isActive && prevItemActive ? "rounded-se-3xl" : ""}`}
                      >
                        <MenuItemContent item={item} isActive={isActive} isCollapsed={isCollapsed} />
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link
                      href={path}
                      className={`w-full block ${isActive ? "bg-white rounded-s-full" : "bg-blue"}
                        ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""}
                        ${!isActive && prevItemActive ? "rounded-se-3xl" : ""}`}
                    >
                      <MenuItemContent item={item} isActive={isActive} isCollapsed={isCollapsed} />
                    </Link>
                  )}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-s-full pointer-events-none ms-4"
                      initial={false}
                      animate={{
                        opacity: hoveredItem === item ? 0.1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Box>
              </ListItem>
            );
          })}
        </List>

        <HelpCenter isCollapsed={isCollapsed} isMobile={false} />
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
        <Box className="flex items-center bg-blue p-4">
          <Box className="w-20 h-20 flex items-center justify-center">
            <img src="/images/logo_stag.png" alt="Stagfast" className="w-16" />
          </Box>
          <Typography variant="h5" className="font-bold text-white w-full">
            STAGFAST
          </Typography>
          <IconButton className="text-white ml-auto" onClick={handleDrawerToggle}>
            <ArrowBackIcon className="text-white" />
          </IconButton>
        </Box>
      </Box>

      <List className="m-0 p-0" disablePadding>
        {menuItems.map((item, index) => {
          const path = getPath(item);
          const isActive = pathname === path;
          const prevItemActive = pathname === getPath(menuItems[index - 1]);
          const nextItemActive = index < menuItems.length - 1 && pathname === getPath(menuItems[index + 1]);

          return (
            <ListItem key={item} className="p-0 ps-5 m-0" disablePadding>
              <Box className="bg-white rounded-s-full w-full border-none">
                <Link
                  href={path}
                  className={`w-full block ${isActive ? "bg-white rounded-s-full" : "bg-blue"}
                    ${!isActive && nextItemActive ? "rounded-ee-3xl" : ""}
                    ${!isActive && prevItemActive ? "rounded-se-3xl" : ""}`}
                  onClick={handleDrawerToggle}
                >
                  <MenuItemContent item={item} isActive={isActive} isCollapsed={false} />
                </Link>
              </Box>
            </ListItem>
          );
        })}
      </List>

      <HelpCenter isCollapsed={false} isMobile={true} />
    </Box>
  );

  return (
    <>
      <Box className="md:hidden fixed top-0 left-0 right-0 bg-[#0C21C1] z-50">
        <MobileTopBar />
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="md:hidden"
        ModalProps={{
          keepMounted: true
        }}
        PaperProps={{
          className: 'w-[280px] bg-blue'
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

const Sidebar = ({ menuItems = [], children }) => {
  const pathname = usePathname();

  return (
    <Box className="flex">
      <DesktopSidebar menuItems={menuItems} pathname={pathname} />
      <MobileSidebar menuItems={menuItems} pathname={pathname} />

      <Box className="flex-1 transition-all duration-300 pt-[72px] md:pt-0 md:ml-[100px]">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;